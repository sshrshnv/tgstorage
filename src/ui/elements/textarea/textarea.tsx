import { h } from 'preact'
import type { FunctionComponent as FC, RefObject } from 'preact'
import { useCallback, useEffect } from 'preact/hooks'
import cn from 'classnames'

import { useStateRef } from '~/tools/hooks'

import styles from './textarea.styl'

type Props = {
  class?: string
  value?: string
  placeholder?: string
  maxLength?: number
  disabled?: boolean
  textareaRef?: RefObject<HTMLTextAreaElement>
  onInput?: (value: string) => void
  onStartSelection?: () => void
}

export const Textarea: FC<Props> = ({
  class: className,
  value = '',
  placeholder,
  maxLength,
  disabled,
  textareaRef,
  onInput,
  onStartSelection
}) => {
  const [inputData, setInputData, inputDataRef, setInputDataRef] = useStateRef({ value })

  const handleInput = useCallback(ev => {
    const value = ev.target.value
    const formattedValue = onInput?.(value)
    setInputData({ value: typeof formattedValue === 'undefined' ? value : formattedValue })
  }, [setInputData, onInput])

  const handlePaste = useCallback(ev => {
    ev.stopPropagation()
  }, [])

  useEffect(() => {
    if (value === inputDataRef.current.value) return
    setInputDataRef.current({ value })
  }, [value])

  return (
    <div class={cn(
      styles.root,
      className
    )}>
      <textarea
        class={styles.textarea}
        placeholder={placeholder ? `${placeholder}…` : ''}
        disabled={disabled}
        ref={textareaRef}
        maxLength={maxLength}
        onInput={handleInput}
        onPaste={handlePaste}
        onSelect={onStartSelection}
        {...inputData}
      />
    </div>
  )
}
