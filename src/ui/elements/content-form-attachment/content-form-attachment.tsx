import type { FunctionComponent as FC } from 'preact'
import { h } from 'preact'
import { memo } from 'preact/compat'
import { useMemo, useCallback } from 'preact/hooks'
import cn from 'classnames'

import type { InputFile } from '~/core/store'
import { getFileUrl } from '~/core/cache'
import { Text } from '~/ui/elements/text'
import { Button } from '~/ui/elements/button'
import { FilePreviewIcon } from '~/ui/elements/file-preview-icon'
import { Loader } from '~/ui/elements/loader'

import styles from './content-form-attachment.styl'

type Props = {
  inputFile?: InputFile
  index: number
  loading?: boolean
  last?: boolean
  onRemoveFile?: (file: InputFile) => void
}

export const ContentFormAttachment: FC<Props> = memo(({
  inputFile,
  loading,
  last,
  onRemoveFile
}) => {
  const previewUrl = useMemo(() => {
    if (!inputFile?.thumbFileKey) {
      return ''
    }
    return getFileUrl(inputFile.thumbFileKey) || ''
  }, [inputFile?.thumbFileKey])

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
        ) : inputFile?.parsing ? (
          <div class={styles.previewLoader}>
            <Loader small/>
          </div>
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
            (loading && last) && styles._active
          )}
          small
          grey
          ellipsis
        >
          {inputFile?.progress.toLocaleString('en-EN', { maximumFractionDigits: 2, minimumFractionDigits: 2 })}%
        </Text>
      </div>
      <Button
        class={styles.button}
        icon="cross"
        fixScroll
        onClick={removeFile}
      />
    </div>
  )
})
