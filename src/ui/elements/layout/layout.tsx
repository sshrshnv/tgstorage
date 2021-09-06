import type { FunctionComponent as FC } from 'preact'
import { h } from 'preact'
import cn from 'classnames'

import styles from './layout.styl'

type Props = {
  scroll?: boolean
  center?: boolean
  wide?: boolean
}

export const Layout: FC<Props> = ({
  children,
  scroll,
  center,
  wide
}) => {

  return (
    <div
      class={cn(
        styles.root,
        scroll && styles._scroll
      )}
    >
      <div class={cn(
        styles.inner,
        center && styles._center,
        wide && styles._wide
      )}>
        {children}
      </div>
    </div>
  )
}
