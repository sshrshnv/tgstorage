import type { FunctionComponent as FC } from 'preact'
import { h } from 'preact'
import { memo } from 'preact/compat'
import { useState, useCallback, useRef, useEffect, useMemo } from 'preact/hooks'
import cn from 'classnames'

import { useTexts } from '~/core/hooks'
import { useCallbackRef } from '~/tools/hooks'
import { Input } from '~/ui/elements/input'
import { animationClassName } from '~/ui/styles'

import styles from './select.styl'

type Option = {
  value: string
  text: string
  subText?: string
  button?: boolean
} | null

type Props = {
  name?: string
  label: string
  options: Option[]
  value?: string
  error?: string | boolean
  disabled?: boolean
  brand?: boolean
  loading?: boolean
  search?: boolean
  onSelect?: (value: string) => void
}

export const Select: FC<Props> = memo(({
  label,
  options,
  name,
  value,
  error,
  disabled,
  brand,
  loading,
  search = false,
  onSelect
}) => {
  const { texts } = useTexts('elements')
  const inputRef = useRef<HTMLInputElement>(null)
  const optionsRef = useRef<HTMLDivElement>(null)
  const [expanded, setExpanded] = useState(false)
  const [focused, setFocused] = useState(false)
  const [selected, setSelected] = useState(false)
  const [searchValue, setSearchValue] = useState('')

  const filteredOptions = useMemo(() => options.filter(option => (
    option &&
    option.text &&
    (search ? option.text.toLowerCase().startsWith(searchValue.toLowerCase()) : true) &&
    (search ? true : option.value !== value)
  )), [search, options, value, searchValue])

  const isFullSearchValue = useMemo(() => (
    searchValue &&
    filteredOptions.length === 1 &&
    filteredOptions[0]?.text.toLowerCase() === searchValue.toLowerCase()
  ), [searchValue, filteredOptions])

  const firstFilteredOption = useMemo(() => {
    return filteredOptions[0]
  }, [filteredOptions])

  const [expand, expandRef] = useCallbackRef(() => {
    if (disabled || loading) return
    if (!focused) {
      inputRef?.current?.focus()
    }
    setExpanded(true)
  }, [disabled, loading, focused, inputRef, setExpanded])

  const [collapse, collapseRef] = useCallbackRef(() => {
    if (focused) {
      inputRef?.current?.blur()
    }
    setExpanded(false)
  }, [focused, inputRef, setExpanded])

  const toggle = useCallback((ev) => {
    ev?.stopPropagation()
    expanded ? collapse() : expand()
  }, [expanded, collapse, expand])

  const handleSearch = useCallback(value => {
    if (selected) {
      setSelected(false)
    }
    setSearchValue(value)
  }, [selected, setSearchValue])

  const select = useCallback(option => {
    onSelect?.(option.value)
    if (search && searchValue && !isFullSearchValue) {
      collapse()
    }
  }, [search, searchValue, isFullSearchValue, collapse, onSelect])

  const handleFocus = useCallback(() => {
    setFocused(true)
  }, [setFocused])

  const handleBlur = useCallback(() => {
    if (search && !selected && filteredOptions.length === 1) {
      select(firstFilteredOption)
    }
    setFocused(false)
  }, [search, selected, firstFilteredOption, filteredOptions.length, select, setFocused])

  useEffect(() => {
    if (!expanded) return

    optionsRef?.current?.animate?.([
      { transform: 'translateY(-8px)', opacity: 0 },
      { opacity: 1, offset: 0.5 },
      { transform: 'translateY(0)', opacity: 1 }
    ], {
      duration: 200,
      fill: 'forwards',
      easing: 'ease-in-out'
    })
  }, [expanded])

  useEffect(() => {
    const selectedOption = options.find(option => option && option.value === value)
    setSearchValue(selectedOption?.text || '')
    selectedOption && setSelected(true)
  }, [options, value])

  useEffect(() => {
    if (!focused && !expanded) return

    const collapse = () => collapseRef.current?.()
    const expand = () => expandRef.current?.()
    const handleKey = (ev) => {
      switch (ev?.code?.toLowerCase()) {
        case 'enter':
          expanded ? collapse() : expand()
          break
        case 'escape':
          expanded && collapse()
          break
      }
    }

    self.addEventListener('keydown', handleKey)
    self.document.addEventListener('click', collapse)
    return () => {
      self.removeEventListener('keydown', handleKey)
      self.document.removeEventListener('click', collapse)
    }
  }, [focused, expanded])

  return (
    <div
      class={cn(
        styles.root,
        styles[animationClassName],
        focused && styles._focused,
        expanded && styles._expanded,
        (!search && !filteredOptions.length) && styles._empty,
        error && styles._error,
        (disabled || loading) && styles._disabled,
        (brand || focused) && styles._brand
      )}
      onClick={toggle}
    >
      <Input
        label={label}
        value={searchValue}
        name={name}
        error={error}
        disabled={disabled || loading}
        readonly={!search || disabled || loading}
        icon={loading ? 'loader' : 'arrow'}
        iconClass={styles.icon}
        forwardedRef={inputRef}
        fakeFocus={expanded}
        brand={brand}
        onInput={handleSearch}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      {expanded && (
        <div
          class={styles.options}
          ref={optionsRef}
        >
          {isFullSearchValue && (
            <div
              class={styles.option}
              onClick={() => select(filteredOptions[0])}
            >
              {filteredOptions[0]?.text}
              {filteredOptions[0]?.subText && (
                <span>{filteredOptions[0]?.subText}</span>
              )}
            </div>
          )}
          {(isFullSearchValue ? options : filteredOptions).map(option => (
            !option ||
            (isFullSearchValue && option.text.toLowerCase() === searchValue.toLowerCase())
          ) ? null : (
              <div
                key={option.value}
                class={cn(
                  styles.option,
                  option.button && styles._button
                )}
                onClick={() => select(option)}
              >
                {option.text}
                {option.subText && (
                  <span>{option.subText}</span>
                )}
              </div>
            )
          )}
          {!search && !filteredOptions.length && (
            <div class={styles.option}>
              {texts.select.empty}
            </div>
          )}
        </div>
      )}
    </div>
  )
})
