import type { FunctionComponent as FC } from 'preact'
import { h } from 'preact'
import cn from 'classnames'

import styles from './sidebar.styl'

type Props = {
  transparent?: boolean
  mobileTransparent?: boolean
  disabled?: boolean
}

export const Sidebar: FC<Props> = ({
  children,
  transparent,
  mobileTransparent,
  disabled
}) => {
  return (
    <div class={cn(
      styles.root,
      transparent && styles._transparent,
      mobileTransparent && styles._mobileTransparent,
      disabled && styles._disabled
    )}>
      <div>
        {children}
      </div>
    </div>
  )
}
