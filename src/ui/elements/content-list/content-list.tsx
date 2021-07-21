import { h } from 'preact'
import type { FunctionComponent as FC, RefCallback } from 'preact'
import cn from 'classnames'

import styles from './content-list.styl'

type Props = {
  intersectionRef: RefCallback<HTMLElement>
  fullHeight?: boolean
}

export const ContentList: FC<Props> = ({
  children,
  intersectionRef,
  fullHeight
}) => {
  return (
    <main
      class={cn(
        styles.root,
        fullHeight && styles._fullHeight
      )}
      ref={intersectionRef}
    >
      {children}
    </main>
  )
}
