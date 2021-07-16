import type { FunctionComponent as FC } from 'preact'
import { h } from 'preact'
import cn from 'classnames'

import styles from './sidebar-wrapper.styl'

type Props = {
  mobileTransparent?: boolean
}

export const SidebarWrapper: FC<Props> = ({
  children,
  mobileTransparent
}) => {

  return (
    <div class={cn(
      styles.root,
      mobileTransparent && styles._mobileTransparent
    )}>
      {children}
    </div>
  )
}
