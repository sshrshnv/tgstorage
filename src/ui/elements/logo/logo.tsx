import type { FunctionComponent as FC } from 'preact'
import { h } from 'preact'

import { Icon } from '~/ui/elements/icon'

import styles from './logo.styl'

type Props = {
  text?: boolean
  icon?: boolean
}

export const Logo: FC<Props> = ({
  text = true,
  icon = true
}) => {
  return (
    <div class={styles.root}>
      {icon && <div class={styles.icon}><Icon icon="app"/></div>}
      {text && <h1 class={styles.text}>TgStorage</h1>}
    </div>
  )
}
