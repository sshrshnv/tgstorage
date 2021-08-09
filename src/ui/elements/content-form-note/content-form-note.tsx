import { h, Fragment } from 'preact'
import type { FunctionComponent as FC } from 'preact'
import { memo } from 'preact/compat'
import { useCallback, useRef, useMemo } from 'preact/hooks'
import cn from 'classnames'

import type { InputFile, Message } from '~/core/store'
import { checkIsParentFilesMessage, parseParentFilesMessage } from '~/tools/handle-content'
import { ContentFormAttachment } from '~/ui/elements/content-form-attachment'
import { ContentFormInput } from '~/ui/elements/content-form-input'
import { FileInput } from '~/ui/elements/file-input'
import { Loader } from '~/ui/elements/loader'
import { Button } from '~/ui/elements/button'
import { SendIcon, CheckboxIcon, FileIcon } from '~/ui/icons'

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
  onRemoveFile
}) => {
  const inputFileKey = useRef(0)

  const isParentFiles = useMemo(() => {
    return checkIsParentFilesMessage(message.text)
  }, [message.text])

  const mediaCount = useMemo(() => {
    return (message.mediaMessages?.length || 0) + +!!message.media?.originalSize
  }, [message.media?.originalSize, message.mediaMessages?.length])

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

  const addFiles = useCallback((fileKeys: string[]) => {
    if (fileKeys?.length) {
      onAddFiles?.(fileKeys)
    }
    inputFileKey.current += 1
  }, [onAddFiles])

  return (
    <Fragment>
      <div>
        <ContentFormInput
          value={normalizedText}
          placeholder={loading ? sendingPlaceholder : placeholder}
          disabled={loading}
          filled={filled}
          onInput={handleInput}
        />
        {message.inputFiles?.map((inputFile, index) => (
          <ContentFormAttachment
            key={inputFile.fileKey}
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

      {mediaCount > 0 && (
        <div class={styles.mediaCount}>
          <FileIcon/> {mediaCount}
        </div>
      )}
    </Fragment>
  )
})
