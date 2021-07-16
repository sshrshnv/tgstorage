import type { FunctionComponent as FC } from 'preact'
import { h } from 'preact'

import styles from './content-item-media-list.styl'

export const ContentItemMediaList: FC = ({
  children
}) => {
  return (
    <div class={styles.root}>
      {children}
    </div>
  )
}
