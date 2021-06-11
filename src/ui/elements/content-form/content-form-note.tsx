import { h, Fragment } from 'preact'
import type { FunctionComponent as FC } from 'preact'
import { useCallback, useEffect, useRef, useMemo } from 'preact/hooks'
import rafSchedule from 'raf-schd'
import cn from 'classnames'

import type { InputFile } from '~/core/store'
import { Textarea } from '~/ui/elements/textarea'
import { FileInput } from '~/ui/elements/file-input'
import { Loader } from '~/ui/elements/loader'
import { Button } from '~/ui/elements/button'
import { SendIcon, CheckboxIcon } from '~/ui/icons'

import styles from './content-form.styl'
import { ContentFormNoteItem } from './content-form-note-item'

type Props = {
  message: {
    text: string
    files?: InputFile[]
  }
  placeholder?: string
  loading?: boolean
  enableChecklist: () => void
  onChangeText?: (note: string) => void
  onAddFiles?: (files: File[]) => void
  onRemoveFile?: (file: InputFile) => void
}

const TEXTAREA_PARENT_HEIGHT = 48
const TEXTAREA_HEIGHT = 22

export const ContentFormNote: FC<Props> = ({
  message,
  placeholder,
  loading,
  enableChecklist,
  onChangeText,
  onAddFiles,
  onRemoveFile
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const isSubmitAvailable = useMemo(() => {
    return (
      !!message.text
        .replaceAll(' ', '')
        .replaceAll('\n', '')
        .length ||
      !!message.files?.length
    )
  }, [message.text, message.files])

  const handleInput = useCallback(value => {
    onChangeText?.(value)
  }, [onChangeText])

  const addFiles = useCallback((files: File[]) => {
    if (files?.length) {
      onAddFiles?.(Array.from(files))
    }
  }, [onAddFiles])

  useEffect(() => {
    rafSchedule(() => {
      const textareaEl = textareaRef?.current
      const textareaParentEl = textareaEl?.parentElement

      if (!textareaParentEl) return

      textareaParentEl.style.height = `${TEXTAREA_PARENT_HEIGHT}px`
      textareaParentEl.style.height = `${TEXTAREA_PARENT_HEIGHT - TEXTAREA_HEIGHT + textareaEl.scrollHeight}px`
    })()
  }, [message.text])

  return (
    <Fragment>
      <div>
        <Textarea
          class={styles.textarea}
          value={message.text}
          placeholder={placeholder}
          forwardedRef={textareaRef}
          onInput={handleInput}
        />
        {message.files?.map(file => (
          <ContentFormNoteItem
            key={file.key}
            inputFile={file}
            onRemoveFile={onRemoveFile}
          />
        ))}
      </div>

      {loading ? (
        <Loader class={styles.loader} brand/>
      ) : (
        <div class={styles.buttons}>
          <FileInput
            class={styles.button}
            onChange={addFiles}
          />
          {isSubmitAvailable ? (
            <Button
              type="submit"
              class={cn(
                styles.button,
                styles._primary
              )}
              icon={<SendIcon/>}
            />
          ) : (
            <Button
              class={styles.button}
              icon={<CheckboxIcon/>}
              onClick={enableChecklist}
            />
          )}
        </div>
      )}
    </Fragment>
  )
}
