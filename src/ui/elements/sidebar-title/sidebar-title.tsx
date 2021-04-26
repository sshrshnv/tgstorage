import { h } from 'preact'
import type { FunctionComponent as FC } from 'preact'
import { useRef } from 'preact/hooks'

import { Menu } from '~/ui/elements/menu'
import type { Props as MenuProps } from '~/ui/elements/menu'

import styles from './sidebar-title.styl'

type Props = {
  menu?: MenuProps | null
}

export const SidebarTitle: FC<Props> = ({
  children,
  menu
}) => {
  const parentRef = useRef(null)

  return (
    <div
      class={styles.root}
      ref={parentRef}
    >
      <h2 class={styles.title}>
        {children}
      </h2>
      { menu && (
        <Menu {...menu} parentRef={parentRef} horizontal/>
      )}
    </div>
  )
}
