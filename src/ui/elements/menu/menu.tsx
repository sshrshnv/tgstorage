import { h } from 'preact'
import type { FunctionComponent as FC } from 'preact'

import { Button } from '~/ui/elements/button'
import { MenuIcon } from '~/ui/icons'

import styles from './menu.styl'

type Props = {

}

export const Menu: FC<Props> = ({

}) => {
  return (
    <div class={styles.root}>
      <Button
        class={styles.button}
        icon={<MenuIcon/>}
        round
      />
    </div>
  )
}
