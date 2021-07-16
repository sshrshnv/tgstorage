import type { FunctionComponent as FC } from 'preact'
import { h } from 'preact'
import { memo } from 'preact/compat'

import styles from './content-item-header.styl'

type Props = {
  date?: string
}

export const ContentItemHeader: FC<Props> = memo(({
  date
}) => {
  return (
    <div class={styles.root}>
      {date}
    </div>
  )
})
