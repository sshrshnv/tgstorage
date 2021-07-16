import type { FunctionComponent as FC } from 'preact'
import { h } from 'preact'

import { Button } from '~/ui/elements/button'
import type { Props } from '~/ui/elements/button'

import styles from './sidebar-action-button.styl'

export const SidebarActionButton: FC<Props> = (props) => {
  return (
    <Button
      class={styles.root}
      round
      {...props}
    />
  )
}
