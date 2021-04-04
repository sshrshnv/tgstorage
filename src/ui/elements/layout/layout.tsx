import { h } from 'preact'
import type { FunctionComponent as FC } from 'preact'
import { useEffect, useRef, useState } from 'preact/hooks'
import cn from 'classnames'

import styles from './layout.styl'

type Props = {
  center?: boolean
  sidebar?: boolean
  content?: boolean
}

export const Layout: FC<Props> = ({
  children,
  center,
  sidebar,
  content
}) => {

  return (
    <div
      class={cn(
        styles.root,
        center && styles._center,
        sidebar && styles._sidebar,
        content && styles._content
      )}
    >
      { children }
    </div>
  )
}
