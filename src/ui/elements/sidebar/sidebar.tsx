import { h } from 'preact'
import type { FunctionComponent as FC } from 'preact'
import cn from 'classnames'

import styles from './sidebar.styl'

type Props = {
  disabled?: boolean
}

export const Sidebar: FC<Props> = ({
  children,
  disabled
}) => {
  return (
    <div class={cn(
      styles.root,
      disabled && styles._disabled
    )}>
      <div>
        {children}
      </div>
    </div>
  )
}
