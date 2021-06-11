import { Fragment, h } from 'preact'
import type { FunctionComponent as FC } from 'preact'
import { useMemo, useCallback } from 'preact/hooks'
import cn from 'classnames'

import type { InputFile } from '~/core/store'
import { Text } from '~/ui/elements/text'
import { Button } from '~/ui/elements/button'
import { CrossIcon, FileIcon } from '~/ui/icons/'

import styles from './content-form.styl'

type Props = {
  inputFile?: InputFile
  onRemoveFile?: (file: InputFile) => void
}

export const ContentFormNoteItem: FC<Props> = ({
  inputFile,
  onRemoveFile
}) => {
  const previewUrl = useMemo(() => {
    if (inputFile?.file?.type.startsWith('image')) {
      return URL.createObjectURL(inputFile.file)
    }
    return ''
  }, [inputFile?.file])

  const fileExtention = useMemo(() => {
    return inputFile?.file?.name?.split('.').pop() || ''
  }, [inputFile?.file?.name])

  const removeFile = useCallback(() => {
    if (inputFile) {
      onRemoveFile?.(inputFile)
    }
  }, [inputFile, onRemoveFile])

  return (
    <div class={styles.noteItem}>
      <div class={cn(
        styles.noteItemPreview,
        !previewUrl && styles._icon
      )}>
        {previewUrl ? (
          <img src={previewUrl}/>
        ) : (
          <Fragment>
            <FileIcon/>
            {fileExtention}
          </Fragment>
        )}
      </div>
      <div class={styles.noteItemContent}>
        <Text small grey ellipsis>{inputFile?.file?.name}</Text>
        <Text small grey ellipsis>{inputFile?.progress}%</Text>
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
}
