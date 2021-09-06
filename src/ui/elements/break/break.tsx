import type { FunctionComponent as FC } from 'preact'
import { h } from 'preact'
import cn from 'classnames'

import styles from './break.styl'

type PXSizes = 0|4|8|12|16|20|24|28|32|36|40|44|48|60|64|72

type PXProps = {
  px: true
  vh?: never
  size?: PXSizes
  mSize?: PXSizes
  dSize?: PXSizes
}

type VHSizes = 0|1|2|3|4|5|6|7|8|9|10

type VHProps = {
  vh: true
  px?: never
  size?: VHSizes
  mSize?: VHSizes
  dSize?: VHSizes
}

export const Break: FC<PXProps | VHProps> = ({
  px,
  vh,
  size,
  mSize,
  dSize
}) => {
  const unit = px ? 'px' : vh ? 'vh' : ''

  return (
    <div class={cn(
      styles.root,
      size && styles[`_size-${unit}-${size}`],
      mSize && styles[`_mSize-${unit}-${mSize}`],
      dSize && styles[`_dSize-${unit}-${dSize}`],
    )}/>
  )
}
