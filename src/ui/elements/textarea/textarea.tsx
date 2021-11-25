import { h } from 'preact'
import type { FunctionComponent as FC, RefObject } from 'preact'
import { useCallback, useEffect, useRef } from 'preact/hooks'
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
  startSelectionRef?: RefObject<(checked?: boolean) => void>
  cancelSelectionRef?: RefObject<() => void>
}

export const Textarea: FC<Props> = ({
  class: outerStyles,
  value = '',
  placeholder,
  maxLength,
  disabled,
  textareaRef,
  onInput,
  startSelectionRef
}) => {
  const [inputData, setInputData, inputDataRef, setInputDataRef] = useStateRef({ value })
  const selectionRef = useRef(false)
  const hasValue = !!inputData.value.length

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

  useEffect(() => {
    if (!hasValue) return

    const textareaEl = textareaRef?.current
    const onStartSelection = (checked?: boolean) => startSelectionRef?.current?.(checked)

    const handleSelectionChange = () => {
      const selection = self.document.getSelection()?.toString()
      const start = textareaEl?.selectionStart || 0
      const end = textareaEl?.selectionEnd || 0

      if (!selectionRef.current && start !== end && selection) {
        selectionRef.current = true
        onStartSelection()
      }

      if (selectionRef.current && (start === end || !selection)) {
        selectionRef.current = false
      }
    }

    self.document.addEventListener('selectionchange', handleSelectionChange)
    return () => self.document.removeEventListener('selectionchange', handleSelectionChange)
  }, [hasValue])

  return (
    <div class={cn(
      styles.root,
      outerStyles
    )}>
      <textarea
        class={styles.textarea}
        placeholder={placeholder ? `${placeholder}…` : ''}
        disabled={disabled}
        ref={textareaRef}
        maxLength={maxLength}
        onInput={handleInput}
        onPaste={handlePaste}
        {...inputData}
      />
    </div>
  )
}
