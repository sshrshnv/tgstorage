import type { FunctionComponent as FC } from 'preact'
import { h } from 'preact'
import { memo } from 'preact/compat'

import { Icon } from '~/ui/elements/icon'

import styles from './link-preview-icon.styl'

export const LinkPreviewIcon: FC = memo(() => {
  return (
    <div class={styles.root}>
      <Icon icon="link"/>
    </div>
  )
})
