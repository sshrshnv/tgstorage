import { h } from 'preact'
import type { FunctionComponent as FC } from 'preact'
import { memo } from 'preact/compat'
import { useMemo, useCallback, useEffect } from 'preact/hooks'
import cn from 'classnames'

import type { InputFile } from '~/core/store'
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
    if (inputFile?.thumb) {
      return URL.createObjectURL(inputFile.thumb)
    } else if (inputFile?.file?.type.startsWith('image')) {
      return URL.createObjectURL(inputFile.file)
    }
    return ''
  }, [inputFile?.file])

  const removeFile = useCallback(() => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl)
    }
    if (inputFile) {
      onRemoveFile?.(inputFile)
    }
  }, [inputFile, previewUrl, onRemoveFile])

  useEffect(() => () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl)
    }
  })

  return (
    <div class={styles.noteItem}>
      <div class={styles.noteItemPreview}>
        {previewUrl ? (
          <img src={previewUrl}/>
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
