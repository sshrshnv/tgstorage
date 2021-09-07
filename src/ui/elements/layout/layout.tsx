import type { FunctionComponent as FC } from 'preact'
import { h } from 'preact'
import cn from 'classnames'

import styles from './layout.styl'

type Props = {
  scroll?: boolean
  center?: boolean
  row?: boolean
  wide?: boolean
  fullHeight?: boolean
  paddingTop?: boolean
}

export const Layout: FC<Props> = ({
  children,
  scroll,
  center,
  row,
  wide,
  fullHeight,
  paddingTop
}) => {

  return (
    <div
      class={cn(
        styles.root,
        scroll && styles._scroll,
        fullHeight && styles._fullHeight
      )}
    >
      <div class={cn(
        styles.inner,
        center && styles._center,
        row && styles._row,
        wide && styles._wide,
        paddingTop && styles._paddingTop
      )}>
        {children}
      </div>
    </div>
  )
}
