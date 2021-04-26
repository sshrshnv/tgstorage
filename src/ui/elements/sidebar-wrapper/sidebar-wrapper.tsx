import { h } from 'preact'
import type { FunctionComponent as FC } from 'preact'

import styles from './sidebar-wrapper.styl'

export const SidebarWrapper: FC = ({
  children
}) => {

  return (
    <div class={styles.root}>
      { children }
    </div>
  )
}
