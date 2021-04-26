import { h } from 'preact'
import type { FunctionComponent as FC } from 'preact'
import { useCallback, useRef, useState } from 'preact/hooks'

import { Button } from '~/ui/elements/button'
import { Textarea } from '~/ui/elements/textarea'
import { FileInput } from '~/ui/elements/file-input'
import { SendIcon, CheckboxIcon, PlusIcon } from '~/ui/icons'

import styles from './content-form.styl'

const FORM_HEIGHT = 48
const TEXTAREA_HEIGHT = 20

type Props = {
  message?: string
  files?: File[]
  checklist?: {
    text: string
    checked: boolean
  }[]
  placeholder?: string
  onAddFiles?: (files: File[]) => void
  onAddMessage?: (message: string) => void
}

export const ContentForm: FC<Props> = ({
  message,
  files,
  checklist,
  placeholder,
  onAddFiles
}) => {
  const formRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const addFiles = useCallback((files: File[]) => {
    if (files?.length) {
      onAddFiles?.(Array.from(files))
    }
  }, [onAddFiles])

  /*const addChecklistItem = useCallback(() => {
    setChecklist([...checklist, {
      text: '',
      checked: false
    }])
  }, [checklist])*/

  const handleInput = useCallback(value => {
    window.requestAnimationFrame(() => {
      const formEl = formRef?.current
      const textareaEl = textareaRef?.current

      if (!formEl || !textareaEl) return

      formRef.current.style.height = `${FORM_HEIGHT}px`
      formRef.current.style.height = `${FORM_HEIGHT - TEXTAREA_HEIGHT + textareaRef.current.scrollHeight}px`
    })
  }, [formRef, textareaRef])

  return (
    <div class={styles.root}>
      <div
        class={styles.form}
        ref={formRef}
      >
        { checklist?.length ? (
          <Button
            class={styles.button}
            icon={<PlusIcon/>}
          />
        ) : (
          <FileInput
            class={styles.button}
            onChange={addFiles}
          />
        )}
        <Textarea
          class={styles.textarea}
          value={message}
          placeholder={placeholder}
          forwardedRef={textareaRef}
          onInput={handleInput}
        />
        { (checklist?.length || files?.length || message) ? (
          <Button
            class={styles.button}
            icon={<SendIcon/>}
          />
        ) : (
          <Button
            class={styles.button}
            icon={<CheckboxIcon/>}
          />
        )}
      </div>
    </div>
  )
}
