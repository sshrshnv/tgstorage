import { h } from 'preact'
import type { FunctionComponent as FC } from 'preact'

import styles from './sidebar-title.styl'

type Props = {

}

export const SidebarTitle: FC<Props> = ({
  children
}) => {
  return (
    <h2 class={styles.root}>
      {children}
    </h2>
  )
}
