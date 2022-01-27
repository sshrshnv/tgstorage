import { h, Fragment } from 'preact'
import type { FunctionComponent as FC } from 'preact'
import { memo } from 'preact/compat'
import { useCallback, useMemo, useState } from 'preact/hooks'
import cn from 'classnames'

import type { InputFile, Message } from '~/core/store'
import { selectFiles } from '~/tools/handle-file'
import { checkIsParentFilesMessage, parseParentFilesMessage } from '~/tools/handle-content'
import { ContentFormAttachment } from '~/ui/elements/content-form-attachment'
import { ContentFormInput } from '~/ui/elements/content-form-input'
import { Loader } from '~/ui/elements/loader'
import { Button } from '~/ui/elements/button'
import { Icon } from '~/ui/elements/icon'

import styles from './content-form-note.styl'

type Props = {
  message: Partial<Message> & {
    text: string
    inputFiles?: InputFile[]
  }
  placeholder?: string
  sendingPlaceholder?: string
  loading?: boolean
  filled?: boolean
  enableChecklist: () => void
  onChangeText?: (note: string) => void
  onAddFiles?: (fileKeys: string[]) => void
  onRemoveFile?: (file: InputFile) => void
  onReoderFiles?: () => void
}

export const ContentFormNote: FC<Props> = memo(({
  message,
  placeholder,
  sendingPlaceholder,
  loading,
  filled,
  enableChecklist,
  onChangeText,
  onAddFiles,
  onRemoveFile,
  onReoderFiles
}) => {
  const [attachmentLoading, setAttachmentLoading] = useState(false)

  const isParentFiles = useMemo(() => {
    return checkIsParentFilesMessage(message.text)
  }, [message.text])

  const mediaCount = useMemo(() => {
    return (message.mediaMessages?.length || 0) + +!!message.media?.originalSize
  }, [message.media?.originalSize, message.mediaMessages?.length])

  const attachmentsCount = useMemo(() => {
    return message.inputFiles?.length || 0
  }, [message.inputFiles?.length])

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

  const addFiles = useCallback(async () => {
    const fileKeys = await selectFiles()
    if (fileKeys?.length) {
      setAttachmentLoading(true)
      try {
        await onAddFiles?.(fileKeys)
      } finally {
        setAttachmentLoading(false)
      }
    }
  }, [onAddFiles, setAttachmentLoading])

  return (
    <Fragment>
      <div>
        <ContentFormInput
          value={normalizedText}
          placeholder={loading ? sendingPlaceholder : placeholder}
          disabled={loading}
          filled={filled}
          hasAttachments={!!attachmentsCount}
          onInput={handleInput}
        />
        <div class={styles.attachments}>
          {message.inputFiles?.map((inputFile, index) => (
            <ContentFormAttachment
              key={inputFile.fileKey}
              index={index}
              inputFile={inputFile}
              loading={loading}
              last={index === attachmentsCount - 1}
              onRemoveFile={onRemoveFile}
            />
          ))}
        </div>
      </div>

      {loading ? (
        <Loader class={styles.loader} brand/>
      ) : (
        <div class={styles.buttons}>
          {attachmentLoading ? (
            <Loader class={styles.loader} blue/>
          ) : (
            <Button
              class={styles.button}
              icon="attach"
              onClick={addFiles}
            />
          )}
          {isSubmitAvailable ? (
            <Button
              type="submit"
              class={cn(
                styles.button,
                styles._primary
              )}
              icon="send"
            />
          ) : (
            <Button
              class={styles.button}
              icon="checkbox"
              onClick={enableChecklist}
            />
          )}
        </div>
      )}

      {attachmentsCount > 0 ? (
        <div class={cn(
          styles.mediaCount,
          attachmentsCount > 1 && styles._withButton
        )}>
          {attachmentsCount > 1 ? <Button icon="reoder" disabled={loading} onClick={onReoderFiles}/> : null}
          <Icon icon="file"/> {mediaCount ? `${mediaCount} + ` : ''}{attachmentsCount}
        </div>
      ) : mediaCount > 0 ? (
        <div class={styles.mediaCount}>
          <Icon icon="file"/> {mediaCount}
        </div>
      ) : null}
    </Fragment>
  )
})
