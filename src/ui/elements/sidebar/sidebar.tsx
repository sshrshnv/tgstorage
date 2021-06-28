import { h } from 'preact'
import type { FunctionComponent as FC } from 'preact'
import cn from 'classnames'

import styles from './sidebar.styl'

type Props = {
  mobileTransparent?: boolean
  disabled?: boolean
}

export const Sidebar: FC<Props> = ({
  children,
  mobileTransparent,
  disabled
}) => {
  return (
    <div class={cn(
      styles.root,
      mobileTransparent && styles._mobileTransparent,
      disabled && styles._disabled
    )}>
      <div>
        {children}
      </div>
    </div>
  )
}
