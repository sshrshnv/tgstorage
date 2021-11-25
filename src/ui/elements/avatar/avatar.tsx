import type { FunctionComponent as FC } from 'preact'
import { h } from 'preact'
import { useMemo, useCallback } from 'preact/hooks'
import cn from 'classnames'

import { Icon } from '~/ui/elements/icon'

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
  const url = useMemo(() => {
    if (!image) return ''
    const blob = new Blob(
      [new Uint8Array(image.bytes)],
      { type: `image/${image.type}` }
    )
    return URL.createObjectURL(blob)
  }, [image?.bytes])

  const handleLoad = useCallback(() => {
    if (!url) return
    URL.revokeObjectURL(url)
  }, [url])

  return url ? (
    <img
      class={styles.root}
      src={url}
      onLoad={handleLoad}
      onClick={onClick}
    />
  ) : (
    <div
      class={cn(
        styles.root,
        styles._icon
      )}
      onClick={onClick}
    >
      <Icon icon="user"/>
    </div>
  )
}
