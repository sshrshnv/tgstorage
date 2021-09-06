import type { FunctionComponent as FC } from 'preact'
import { h } from 'preact'

import styles from './pictures-group.styl'

type Props = {

}

export const PicturesGroup: FC<Props> = ({
  children
}) => {
  return (
    <div class={styles.root}>
      {children}
    </div>
  )
}
