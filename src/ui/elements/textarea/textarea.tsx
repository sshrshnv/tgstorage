import { h } from 'preact'
import type { FunctionComponent as FC, RefObject } from 'preact'
import { useCallback, useState } from 'preact/hooks'
import cn from 'classnames'

import styles from './textarea.styl'

type Props = {
  class?: string
  value?: string
  placeholder?: string
  disabled?: boolean
  forwardedRef?: RefObject<HTMLTextAreaElement>
  onInput?: (value: string) => void
}

export const Textarea: FC<Props> = ({
  class: className,
  value = '',
  placeholder,
  disabled,
  forwardedRef,
  onInput
}) => {
  const [inputData, setInputData] = useState({ value })

  const handleInput = useCallback(ev => {
    const value = ev.target.value.replace('  ', ' ')
    const formattedValue = onInput?.(value)
    setInputData({ value: typeof formattedValue === 'undefined' ? value : formattedValue })
  }, [setInputData, onInput])

  const handlePaste = useCallback(ev => {
    ev.stopPropagation()
  }, [])

  return (
    <div class={cn(
      styles.root,
      className
    )}>
      <textarea
        class={styles.textarea}
        placeholder={placeholder ? `${placeholder}…` : ''}
        disabled={disabled}
        ref={forwardedRef}
        maxLength={1000}
        onInput={handleInput}
        onPaste={handlePaste}
        {...inputData}
      />
    </div>
  )
}
