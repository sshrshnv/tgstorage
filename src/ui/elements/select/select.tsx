import { h } from 'preact'
import type { FunctionComponent as FC } from 'preact'
import { useState, useCallback, useRef, useEffect, useMemo } from 'preact/hooks'
import cn from 'classnames'

import { Input } from '~/ui/elements/input'
import { ArrowIcon } from '~/ui/icons'

import styles from './select.styl'

type Option = {
  value: string
  text: string
  subText?: string
} | null

type Props = {
  label: string
  options: Option[]
  name?: string
  value?: string
  error?: string | boolean
  disabled?: boolean
  search?: boolean
  onSelect?: (value: string) => void
}

export const Select: FC<Props> = ({
  label,
  options,
  name,
  value,
  error,
  disabled,
  search = false,
  onSelect
}) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [expanded, setExpanded] = useState(false)
  const [focused, setFocused] = useState(false)
  const [selected, setSelected] = useState(false)
  const [searchValue, setSearchValue] = useState('')

  const filteredOptions = useMemo(() => options.filter(option => (
    option &&
    (search ? option.text.toLowerCase().startsWith(searchValue.toLowerCase()) : true) &&
    (search ? true : option.value !== value)
  )), [search, options, value, searchValue])

  const isFullSearchValue = useMemo(() => (
    searchValue &&
    filteredOptions.length === 1 &&
    filteredOptions[0]?.text.toLowerCase() === searchValue.toLowerCase()
  ), [searchValue, filteredOptions])

  const expand = useCallback(() => {
    if (!focused) {
      inputRef?.current?.focus()
    }
    setExpanded(true)
  }, [focused, inputRef, setExpanded])

  const collapse = useCallback(() => {
    if (focused) {
      inputRef?.current?.blur()
    }
    setExpanded(false)
  }, [focused, inputRef, setExpanded])

  const toggle = useCallback(() => {
    if (expanded) {
      collapse()
    } else {
      expand()
    }
  }, [expanded, collapse, expand])

  const handleSearch = useCallback(value => {
    if (selected) {
      setSelected(false)
    }
    setSearchValue(value)
  }, [selected, setSearchValue])

  const select = useCallback(option => {
    onSelect?.(option.value)
  }, [onSelect])

  const handleFocus = useCallback(() => {
    setFocused(true)
  }, [setFocused])

  const handleBlur = useCallback(() => {
    if (search && !selected && filteredOptions.length === 1) {
      select(filteredOptions[0])
    }
    setFocused(false)
  }, [search, selected, filteredOptions.length, select, setFocused])

  useEffect(() => {
    const selectedOption = options.find(option => option && option.value === value)
    setSearchValue(selectedOption?.text || '')
    selectedOption && setSelected(true)
  }, [options, value])

  useEffect(() => {
    const handleKey = ({ code }) => {
      if (!focused) return
      switch (code.toLowerCase()) {
        case 'enter':
          expanded ? collapse() : expand()
          break
        case 'escape':
          expanded && collapse()
          break
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [focused, expanded])

  return (
    <div
      class={cn(
        styles.root,
        focused && styles._focused,
        expanded && styles._expanded,
        error && styles._error,
        disabled && styles._disabled
      )}
      onClick={toggle}
    >
      <Input
        label={label}
        value={searchValue}
        name={name}
        error={error}
        disabled={disabled}
        readonly={!search}
        icon={<ArrowIcon class={styles.icon}/>}
        forwardedRef={inputRef}
        onInput={handleSearch}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      { expanded && (
        <div class={styles.options}>
          { isFullSearchValue && (
            <div
              class={styles.option}
              onClick={() => select(filteredOptions[0])}
            >
              { filteredOptions[0]?.text }
              { filteredOptions[0]?.subText && (
                <span>{filteredOptions[0]?.subText}</span>
              )}
            </div>
          )}
          { (isFullSearchValue ? options : filteredOptions).map(option => (
            !option ||
            (isFullSearchValue && option.text.toLowerCase() === searchValue.toLowerCase())
          ) ? null : (
              <div
                key={option.value}
                class={styles.option}
                onClick={() => select(option)}
              >
                { option.text }
                { option.subText && (
                  <span>{option.subText}</span>
                )}
              </div>
            )
          )}
        </div>
      )}
    </div>
  )
}
