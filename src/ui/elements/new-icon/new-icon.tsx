import type { FunctionComponent as FC } from 'preact'
import { h } from 'preact'

import styles from './new-icon.styl'

type Props = {
  badge?: boolean
}

export const NewIcon: FC<Props> = ({
  badge = true
}) => {
  return (
    <div class={styles.root}>
      v2.0
      {badge && <div class={styles.badge}/>}
    </div>
  )
}
