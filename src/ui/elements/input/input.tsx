import { h } from 'preact'
import type { FunctionComponent as FC, RefObject } from 'preact'
import { useCallback, useRef, useState, useEffect, useMemo } from 'preact/hooks'
import cn from 'classnames'

import { moveCursorToEnd } from './input.helpers'
import styles from './input.styl'

type Props = {
  name?: string
  label: string
  error?: string | boolean
  value?: string
  forwardedRef?: RefObject<HTMLInputElement>
  icon?: h.JSX.Element | null
  autoComplete?: string
  type?: string
  disabled?: boolean
  readonly?: boolean
  maxLength?: number
  fakeFocus?: boolean
  border?: boolean
  onFocus?: () => void
  onBlur?: () => void
  onInput?: (value: string) => void
  onIconClick?: () => void
}

export const Input: FC<Props> = ({
  label,
  value,
  error,
  border = true,
  icon,
  forwardedRef,
  maxLength = 50,
  fakeFocus,
  onFocus,
  onBlur,
  onInput,
  onIconClick,
  ...inputProps
}) => {
  const [inputData, setInputData] = useState({ value })
  const [focused, setFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const inputEl = forwardedRef?.current || inputRef?.current

  const handleFocus = useCallback(() => {
    moveCursorToEnd(inputEl)
    setFocused(true)
    onFocus?.()
  }, [inputEl, setFocused, onFocus])

  const handleBlur = useCallback(() => {
    setFocused(false)
    onBlur?.()
  }, [setFocused, onBlur])

  const handleInput = useCallback(ev => {
    const value = ev?.target?.value.replace('  ', ' ') || ''
    const formattedValue = onInput?.(value)
    setInputData({ value: typeof formattedValue === 'undefined' ? value : formattedValue })
  }, [setInputData, onInput])

  useEffect(() => {
    if (inputData.value !== value) {
      setInputData({ value })
    }
  }, [value])

  return (
    <div class={cn(
      styles.root,
      (focused || fakeFocus) && styles._focused,
      error && styles._error
    )}>
      <input
        class={cn(
          styles.input,
          border && styles._border,
          icon && styles._icon
        )}
        ref={forwardedRef || inputRef}
        autoComplete="off"
        maxLength={maxLength}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onInput={handleInput}
        {...inputData}
        {...inputProps}
      />
      { icon && (
        <div class={styles.icon} onClick={onIconClick}>
          {icon}
        </div>
      )}
      <div class={styles.label}>
        { error && typeof error === 'string' ? error : label }
      </div>
    </div>
  )
}
