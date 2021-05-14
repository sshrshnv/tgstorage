import { h } from 'preact'
import type { FunctionComponent as FC, RefObject } from 'preact'

import styles from './content-list.styl'

type Props = {
  forwardedRef: RefObject<HTMLDivElement>
}

export const ContentList: FC<Props> = ({
  children,
  forwardedRef
}) => {
  return (
    <main
      class={styles.root}
      ref={forwardedRef}
    >
      {children}
    </main>
  )
}
