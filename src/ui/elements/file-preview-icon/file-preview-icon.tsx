import { h } from 'preact'
import type { FunctionComponent as FC } from 'preact'
import { memo } from 'preact/compat'
import { useMemo } from 'preact/hooks'

import { FileIcon } from '~/ui/icons'

import styles from './file-preview-icon.styl'

type Props = {
  name?: string
}

export const FilePreviewIcon: FC<Props> = memo(({
  name
}) => {
  const extention = useMemo(() => {
    return name?.split('.').pop() || ''
  }, [name])

  return (
    <div class={styles.root}>
      <FileIcon/>
      {extention}
    </div>
  )
})
