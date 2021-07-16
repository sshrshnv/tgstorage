import { h } from 'preact'
import type { FunctionComponent as FC, RefObject } from 'preact'
import cn from 'classnames'

import styles from './content-list.styl'

type Props = {
  forwardedRef: RefObject<HTMLDivElement>
  fullHeight?: boolean
}

export const ContentList: FC<Props> = ({
  children,
  forwardedRef,
  fullHeight
}) => {
  return (
    <main
      class={cn(
        styles.root,
        fullHeight && styles._fullHeight
      )}
      ref={forwardedRef}
    >
      {children}
    </main>
  )
}
