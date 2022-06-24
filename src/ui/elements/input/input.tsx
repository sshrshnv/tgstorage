import { h } from 'preact'
import type { FunctionComponent as FC, RefObject } from 'preact'
import { memo } from 'preact/compat'
import { useCallback, useRef, useState, useEffect } from 'preact/hooks'
import cn from 'classnames'

import { useUpdatableRef } from '~/tools/hooks'
import { moveCursorToEnd } from '~/tools/manipulate-element'
import { Loader } from '~/ui/elements/loader'
import { Icon } from '~/ui/elements/icon'

import styles from './input.styl'

type Props = {
  class?: string
  name?: string
  label?: string
  error?: string | boolean
  value?: string
  placeholder?: string
  forwardedRef?: RefObject<HTMLInputElement>
  icon?: string
  iconClass?: string
  autoComplete?: string
  type?: string
  disabled?: boolean
  readonly?: boolean
  maxLength?: number
  autoFocus?: boolean
  fakeFocus?: boolean
  brand?: boolean
  border?: boolean
  clear?: boolean
  onFocus?: () => void
  onBlur?: () => void
  onInput?: (value: string) => void
  onIconClick?: () => void
}

export const Input: FC<Props> = memo(({
  class: outerStyles,
  label,
  value,
  placeholder,
  error,
  disabled,
  brand,
  border = true,
  icon,
  iconClass: iconClassName,
  forwardedRef,
  maxLength = 256,
  autoFocus,
  fakeFocus,
  clear,
  onFocus,
  onBlur,
  onInput,
  onIconClick,
  ...inputProps
}) => {
  const [inputData, setInputData] = useState({ value })
  const [focused, setFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const autoFocusRef = useUpdatableRef(autoFocus)
  const inputDataValueRef = useUpdatableRef(inputData.value)

  const handleFocus = useCallback(() => {
    moveCursorToEnd((forwardedRef || inputRef)?.current)
    setFocused(true)
    onFocus?.()
  }, [forwardedRef, inputRef, setFocused, onFocus])

  const handleBlur = useCallback(() => {
    setFocused(false)
    onBlur?.()
  }, [setFocused, onBlur])

  const handleClear = useCallback(() => {
    const formattedValue = onInput?.('')
    setInputData({ value: typeof formattedValue === 'undefined' ? '' : formattedValue });
    (forwardedRef || inputRef)?.current?.focus()
  }, [forwardedRef, setInputData, onInput])

  const handleInput = useCallback(ev => {
    const value = ev?.target?.value.replace('  ', ' ') || ''
    const formattedValue = onInput?.(value)
    setInputData({ value: typeof formattedValue === 'undefined' ? value : formattedValue })
  }, [setInputData, onInput])

  useEffect(() => {
    if (inputDataValueRef.current !== value) {
      setInputData({ value })
    }
  }, [value])

  useEffect(() => {
    if (!autoFocusRef.current) return
    setTimeout(() => {
      (forwardedRef || inputRef)?.current?.focus()
    }, 300)
  }, [])

  return (
    <div class={cn(
      styles.root,
      outerStyles,
      (brand || focused || fakeFocus) && styles._brand,
      disabled && styles._disabled,
      error && styles._error
    )}>
      <input
        class={cn(
          styles.input,
          border && styles._border,
          icon && styles._icon
        )}
        placeholder={placeholder ? `${placeholder}…` : ''}
        disabled={disabled}
        ref={forwardedRef || inputRef}
        autoComplete="off"
        maxLength={maxLength}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onInput={handleInput}
        {...inputData}
        {...inputProps}
      />
      {(icon || (clear && inputData.value)) && (
        <div class={styles.icon} onClick={icon ? onIconClick : handleClear}>
          {icon === 'loader' ? (
            <Loader
              class={cn(iconClassName)}
            />
          ) : (
            <Icon
              class={cn(iconClassName)}
              icon={icon || 'cross'}
            />
          )}
        </div>
      )}
      {(label || error) && (
        <div class={styles.label}>
          {error && typeof error === 'string' ? error : label}
        </div>
      )}
    </div>
  )
})
