import type { FunctionComponent as FC } from 'preact'
import { h } from 'preact'
import { memo } from 'preact/compat'

import { LinkIcon } from '~/ui/icons'

import styles from './link-preview-icon.styl'

export const LinkPreviewIcon: FC = memo(() => {
  return (
    <div class={styles.root}>
      <LinkIcon/>
    </div>
  )
})
