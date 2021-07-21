import type { FunctionComponent as FC } from 'preact'
import { h } from 'preact'
import { memo } from 'preact/compat'
import { useMemo, useCallback } from 'preact/hooks'
import cn from 'classnames'

import type { InputFile } from '~/core/store'
import { getFile, getFileMeta } from '~/core/cache'
import { Text } from '~/ui/elements/text'
import { Button } from '~/ui/elements/button'
import { FilePreviewIcon } from '~/ui/elements/file-preview-icon'
import { CrossIcon } from '~/ui/icons/'

import styles from './content-form.styl'

type Props = {
  inputFile?: InputFile
  index: number
  loading?: boolean
  onRemoveFile?: (file: InputFile) => void
}

export const ContentFormNoteItem: FC<Props> = memo(({
  inputFile,
  index,
  loading,
  onRemoveFile
}) => {
  const previewUrl = useMemo(() => {
    if (inputFile?.thumbFileKey) {
      let thumbFile = getFile(inputFile.thumbFileKey)
      if (!thumbFile) return ''

      const url = URL.createObjectURL(thumbFile)
      thumbFile = undefined
      return url
    } else if (inputFile?.fileKey) {
      const fileMeta = getFileMeta(inputFile.fileKey)
      if (!fileMeta?.type.startsWith('image')) return ''

      let file = getFile(inputFile.fileKey)
      if (!file) return ''

      const url = URL.createObjectURL(file)
      file = undefined
      return url
    }
    return ''
  }, [inputFile?.fileKey, inputFile?.thumbFileKey])

  const removeFile = useCallback(() => {
    if (inputFile) {
      onRemoveFile?.(inputFile)
    }
  }, [inputFile, onRemoveFile])

  const handleLoad = useCallback(() => {
    URL.revokeObjectURL(previewUrl)
  }, [previewUrl])

  return (
    <div class={styles.noteItem}>
      <div class={styles.noteItemPreview}>
        {previewUrl ? (
          <img
            src={previewUrl}
            onLoad={handleLoad}
          />
        ) : (
          <FilePreviewIcon
            name={inputFile?.name}
          />
        )}
      </div>
      <div class={styles.noteItemContent}>
        <Text small grey ellipsis>
          {inputFile?.name}
        </Text>
        <Text
          class={cn(
            styles.noteItemContentProgress,
            (loading && index === 0) && styles._active
          )}
          small
          grey
          ellipsis
        >
          {inputFile?.progress}%
        </Text>
      </div>
      <Button
        class={cn(
          styles.button,
          styles._content,
          styles._small
        )}
        icon={<CrossIcon/>}
        onClick={removeFile}
      />
    </div>
  )
})
