import type { FunctionComponent as FC } from 'preact'
import { h } from 'preact'
import { memo } from 'preact/compat'
import { useMemo } from 'preact/hooks'

import styles from './file-preview-icon.styl'
import { Icon } from '~/ui/elements/icon'

type Props = {
  name?: string
  isAudio?: boolean
}

export const FilePreviewIcon: FC<Props> = memo(({
  name,
  isAudio
}) => {
  const extention = useMemo(() => {
    return name?.split('.').pop() || ''
  }, [name])

  return (
    <div class={styles.root}>
      <Icon icon={isAudio ? 'play' : 'file'}/>
      {extention}
    </div>
  )
})
