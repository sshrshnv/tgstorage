import { h } from 'preact'
import type { FunctionComponent as FC } from 'preact'

import styles from './sidebar-header.styl'

export const SidebarHeader: FC = ({
  children
}) => {
  return (
    <div class={styles.root}>
      {children}
    </div>
  )
}
