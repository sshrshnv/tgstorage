import type { FunctionComponent as FC } from 'preact'
import { h } from 'preact'
import { memo } from 'preact/compat'

import { Loader } from '~/ui/elements/loader'

import styles from './qrcode.styl'

export const FallbackQRCode: FC = memo(() => {
  return (
    <div class={styles.root}>
      <Loader/>
    </div>
  )
})
