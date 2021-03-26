import { h } from 'preact'
import type { FunctionComponent as FC } from 'preact'

import styles from './sidebar.styl'

type Props = {

}

export const Sidebar: FC<Props> = ({
  children
}) => {
  return (
    <div class={styles.root}>
      {children}
    </div>
  )
}
