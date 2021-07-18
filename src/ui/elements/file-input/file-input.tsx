import type { FunctionComponent as FC } from 'preact'
import { h } from 'preact'
import { useCallback } from 'preact/hooks'
import cn from 'classnames'

import { setFile } from '~/core/cache'
import { AttachIcon } from '~/ui/icons'

import styles from './file-input.styl'

type Props = {
  class?: string
  onChange?: (fileKeys: string[]) => void
}

export const FileInput: FC<Props> = ({
  class: className,
  onChange
}) => {
  const handleChange = useCallback((ev) => {
    const fileList: FileList = ev.target.files
    const fileKeys: string[] = []

    for (let i = 0; i < fileList.length; i++) {
      const fileKey = setFile(fileList.item(i))
      if (fileKey && !fileKeys.includes(fileKey)) {
        fileKeys.push(fileKey)
      }
    }

    ev.target.value = ''
    onChange?.(fileKeys)
  }, [onChange])

  return (
    <label class={cn(
      styles.root,
      className
    )}>
      <input
        class={styles.input}
        type="file"
        multiple
        onChange={handleChange}
      />
      <AttachIcon/>
    </label>
  )
}
