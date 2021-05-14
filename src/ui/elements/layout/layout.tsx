import { h } from 'preact'
import type { FunctionComponent as FC } from 'preact'
import cn from 'classnames'

import styles from './layout.styl'

type Props = {
  center?: boolean
}

export const Layout: FC<Props> = ({
  children,
  center
}) => {

  return (
    <div
      class={cn(
        styles.root,
        center && styles._center
      )}
    >
      {children}
    </div>
  )
}
