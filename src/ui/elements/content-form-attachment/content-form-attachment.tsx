import type { FunctionComponent as FC } from 'preact'
import { h } from 'preact'
import { memo } from 'preact/compat'
import { useMemo, useCallback } from 'preact/hooks'
import cn from 'classnames'

import type { InputFile } from '~/core/store'
import { getFileUrl, getFileMeta } from '~/core/cache'
import { Text } from '~/ui/elements/text'
import { Button } from '~/ui/elements/button'
import { FilePreviewIcon } from '~/ui/elements/file-preview-icon'
import { CrossIcon } from '~/ui/icons/'

import styles from './content-form-attachment.styl'

type Props = {
  inputFile?: InputFile
  index: number
  loading?: boolean
  onRemoveFile?: (file: InputFile) => void
}

export const ContentFormAttachment: FC<Props> = memo(({
  inputFile,
  index,
  loading,
  onRemoveFile
}) => {
  const previewUrl = useMemo(() => {
    if (inputFile?.thumbFileKey) {
      return getFileUrl(inputFile.thumbFileKey) || ''
    } else if (inputFile?.fileKey) {
      const fileMeta = getFileMeta(inputFile.fileKey)
      if (!fileMeta?.type.startsWith('image')) return ''
      return getFileUrl(inputFile.fileKey) || ''
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
    <div class={styles.root}>
      <div class={styles.preview}>
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
      <div class={styles.content}>
        <Text small grey ellipsis>
          {inputFile?.name}
        </Text>
        <Text
          class={cn(
            styles.progress,
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
        class={styles.button}
        icon={<CrossIcon/>}
        onClick={removeFile}
      />
    </div>
  )
})
