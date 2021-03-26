import { h } from 'preact'
import type { FunctionComponent as FC } from 'preact'
import { useMemo } from 'preact/hooks'

import { UserIcon } from '~/ui/icons'

import styles from './avatar.styl'

type Props = {
  image?: {
    bytes: Uint8Array
    type: string
  } | null
  onClick?: () => void
}

export const Avatar: FC<Props> = ({
  image,
  onClick
}) => {
  const src = useMemo(() => {
    if (!image) return ''

    const blob = new Blob(
      [image.bytes.buffer],
      { type: `image/${image.type}` }
    )
    return window.URL.createObjectURL(blob)
  }, [image?.bytes, image?.type])

  return src ? (
    <img
      class={styles.root}
      src={src}
      onClick={onClick}
    />
  ) : (
    <div
      class={styles.root}
      onClick={onClick}
    >
      <UserIcon/>
    </div>
  )
}
