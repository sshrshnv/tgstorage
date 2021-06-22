import { h } from 'preact'
import type { FunctionComponent as FC } from 'preact'
import { memo } from 'preact/compat'
import { useState, useCallback, useRef, useEffect, useMemo } from 'preact/hooks'
import cn from 'classnames'

import { useTexts } from '~/core/hooks'
import { Input } from '~/ui/elements/input'
import { Loader } from '~/ui/elements/loader'
import { ArrowIcon } from '~/ui/icons'
import { animationClassName } from '~/ui/styles/animation'

import styles from './select.styl'

type Option = {
  value: string
  text: string
  subText?: string
} | null

type Props = {
  name?: string
  label: string
  options: Option[]
  value?: string
  error?: string | boolean
  disabled?: boolean
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
  loading,
  search = false,
  onSelect
}) => {
  const { texts } = useTexts()
  const inputRef = useRef<HTMLInputElement>(null)
  const optionsRef = useRef<HTMLDivElement>(null)
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
    if (disabled || loading) return
    if (!focused) {
      inputRef?.current?.focus()
    }
    setExpanded(true)
  }, [disabled, loading, focused, inputRef, setExpanded])

  const collapse = useCallback(() => {
    if (focused) {
      inputRef?.current?.blur()
    }
    setExpanded(false)
  }, [focused, inputRef, setExpanded])

  const toggle = useCallback(() => {
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
    const handleKey = ({ code }) => {
      if (!focused && !expanded) return
      switch (code.toLowerCase()) {
        case 'enter':
          expanded ? collapse() : expand()
          break
        case 'escape':
          expanded && collapse()
          break
      }
    }
    self.addEventListener('keydown', handleKey)
    return () => self.removeEventListener('keydown', handleKey)
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
        (disabled || loading) && styles._disabled
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
        icon={loading ? <Loader class={styles.icon}/> : <ArrowIcon class={styles.icon}/>}
        forwardedRef={inputRef}
        fakeFocus={expanded}
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
                class={styles.option}
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
              {texts.empty}
            </div>
          )}
        </div>
      )}
    </div>
  )
})
