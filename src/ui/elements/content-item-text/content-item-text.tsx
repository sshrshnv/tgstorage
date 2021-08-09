import type { FunctionComponent as FC } from 'preact'
import { h } from 'preact'
import { memo } from 'preact/compat'
import cn from 'classnames'

import styles from './content-item-text.styl'

type Props = {
  text: string
  emptyText: string
  empty?: boolean
}

export const ContentItemText: FC<Props> = memo(({
  text,
  emptyText,
  empty
}) => {
  return (
    <div class={cn(
      styles.root,
      !text && styles._empty
    )}>
      <div dangerouslySetInnerHTML={{ __html: text }}/>
      {empty && (
        <div class={styles.emptyText}>
          {emptyText}
        </div>
      )}
    </div>
  )
})
