import { h, Fragment } from 'preact'
import type { FunctionComponent as FC } from 'preact'
import { memo } from 'preact/compat'
import { useCallback, useEffect, useRef, useMemo } from 'preact/hooks'
import rafSchedule from 'raf-schd'
import cn from 'classnames'

import type { InputFile } from '~/core/store'
import {
  checkIsParentFilesMessage,
  parseParentFilesMessage
} from '~/tools/handle-content'
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
    inputFiles?: InputFile[]
  }
  placeholder?: string
  sendingPlaceholder?: string
  loading?: boolean
  isOpened?: boolean
  enableChecklist: () => void
  onChangeText?: (note: string) => void
  onAddFiles?: (files: File[]) => void
  onRemoveFile?: (file: InputFile) => void
}

const TEXTAREA_PARENT_HEIGHT = 48
const TEXTAREA_HEIGHT = 22

export const ContentFormNote: FC<Props> = memo(({
  message,
  placeholder,
  sendingPlaceholder,
  loading,
  isOpened,
  enableChecklist,
  onChangeText,
  onAddFiles,
  onRemoveFile
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const inputFileKey = useRef(0)

  const isParentFiles = useMemo(() => {
    return checkIsParentFilesMessage(message.text)
  }, [message.text])

  const normalizedText = useMemo(() => {
    return isParentFiles ? parseParentFilesMessage(message.text).text : message.text
  }, [message.text, isParentFiles])

  const isSubmitAvailable = useMemo(() => {
    return (
      !!message.text
        .replaceAll(' ', '')
        .replaceAll('\n', '')
        .length ||
      !!message.inputFiles?.length
    )
  }, [message.text, message.inputFiles])

  const handleInput = useCallback(value => {
    onChangeText?.(value)
  }, [onChangeText])

  const addFiles = useCallback((files: File[]) => {
    if (files?.length) {
      onAddFiles?.(Array.from(files))
    }
    inputFileKey.current += 1
  }, [onAddFiles])

  const setStyles = useCallback(rafSchedule((textareaRef) => {
    const textareaEl = textareaRef?.current
    const textareaParentEl = textareaEl?.parentElement
    if (!textareaParentEl) return

    textareaParentEl.style.height = `${TEXTAREA_PARENT_HEIGHT}px`
    textareaParentEl.style.height = `${TEXTAREA_PARENT_HEIGHT - TEXTAREA_HEIGHT + textareaEl.scrollHeight}px`
  }), [])

  useEffect(() => {
    setStyles(textareaRef)
  }, [message.text])

  useEffect(() => {
    if (!isOpened) return
    textareaRef.current?.focus()
  }, [isOpened])

  useEffect(() => () => {
    setStyles.cancel()
  }, [])

  return (
    <Fragment>
      <div>
        <Textarea
          class={styles.textarea}
          value={normalizedText}
          placeholder={loading ? sendingPlaceholder : placeholder}
          disabled={loading}
          forwardedRef={textareaRef}
          onInput={handleInput}
        />
        {message.inputFiles?.map((inputFile, index) => (
          <ContentFormNoteItem
            key={inputFile.key}
            index={index}
            inputFile={inputFile}
            loading={loading}
            onRemoveFile={onRemoveFile}
          />
        ))}
      </div>

      {loading ? (
        <Loader class={styles.loader} brand/>
      ) : (
        <div class={styles.buttons}>
          <FileInput
            key={inputFileKey.current}
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
})
