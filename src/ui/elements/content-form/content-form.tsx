import { h } from 'preact'
import type { FunctionComponent as FC } from 'preact'
import { useCallback, useRef } from 'preact/hooks'
import rafSchedule from 'raf-schd'

import { Form } from '~/ui/elements/form'
import { Button } from '~/ui/elements/button'
import { Textarea } from '~/ui/elements/textarea'
import { FileInput } from '~/ui/elements/file-input'
import { SendIcon, CheckboxIcon, PlusIcon } from '~/ui/icons'

import styles from './content-form.styl'

const FORM_HEIGHT = 48
const TEXTAREA_HEIGHT = 22

type Props = {
  text?: string
  files?: File[]
  checklist?: {
    text: string
    checked: boolean
  }[]
  placeholder?: string
  onSubmit?: () => void
  onAddFiles?: (files: File[]) => void
  onChangeText?: (note: string) => void
}

export const ContentForm: FC<Props> = ({
  text,
  files,
  checklist,
  placeholder,
  onSubmit,
  onAddFiles,
  onChangeText
}) => {
  const formRef = useRef<HTMLFormElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleInput = useCallback(value => {
    onChangeText?.(value)
    rafSchedule(() => {
      const formEl = formRef?.current
      const textareaEl = textareaRef?.current

      if (!formEl || !textareaEl) return

      formRef.current.style.height = `${FORM_HEIGHT}px`
      formRef.current.style.height = `${FORM_HEIGHT - TEXTAREA_HEIGHT + textareaRef.current.scrollHeight}px`
    })()
  }, [formRef, textareaRef, onChangeText])

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

  return (
    <div class={styles.root}>
      <Form
        class={styles.form}
        forwardedRef={formRef}
        onSubmit={onSubmit}
      >
        {checklist?.length ? (
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
          value={text}
          placeholder={placeholder}
          forwardedRef={textareaRef}
          onInput={handleInput}
        />
        {(checklist?.length || files?.length || text) ? (
          <Button
            type="submit"
            class={styles.button}
            icon={<SendIcon/>}
          />
        ) : (
          <Button
            class={styles.button}
            icon={<CheckboxIcon/>}
          />
        )}
      </Form>
    </div>
  )
}
