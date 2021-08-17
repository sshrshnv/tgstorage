import type { FunctionComponent as FC } from 'preact'
import { h } from 'preact'
import { memo } from 'preact/compat'

import type { MessageFwd } from '~/core/store'

import styles from './content-item-header.styl'

type Props = {
  date?: string
  fwd?: MessageFwd
  fwdTitle?: string
  fwdFromTitle?: string
}

export const ContentItemHeader: FC<Props> = memo(({
  date,
  fwd,
  fwdTitle,
  fwdFromTitle
}) => {
  return (
    <div class={styles.root}>
      <span>
        {date}{fwd ? fwd.name ? ` / ${fwdFromTitle} ${fwd.name}` : ` / ${fwdTitle}` : ''}
      </span>
    </div>
  )
})
