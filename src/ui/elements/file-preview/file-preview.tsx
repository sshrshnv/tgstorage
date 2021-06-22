import { h } from 'preact'
import type { FunctionComponent as FC } from 'preact'
import { memo } from 'preact/compat'
import { useEffect, useState } from 'preact/hooks'
import cn from 'classnames'

import styles from './file-preview.styl'

type Props = {
  class?: string
  url?: string
}

export const FilePreview: FC<Props> = memo(({
  class: className,
  url
}) => {
  const [ready, setReady] = useState(!!url)

  useEffect(() => {
    if (!url || ready) return
    setReady(true)
  }, [url])

  return !url ? null : (
    <img
      class={cn(
        className,
        styles.root,
        ready && styles._visible
      )}
      src={url}
    />
  )
})
