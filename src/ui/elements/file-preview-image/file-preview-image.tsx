import { h, Fragment } from 'preact'
import type { FunctionComponent as FC } from 'preact'
import { memo } from 'preact/compat'
import { useEffect, useState, useCallback } from 'preact/hooks'
import cn from 'classnames'

import { getFile } from '~/core/cache'
import { PlayIcon } from '~/ui/icons'

import styles from './file-preview-image.styl'

type Props = {
  class?: string
  fileKey?: string
  timeout?: number
  isFullscreen?: boolean
  isVideo?: boolean
}

export const FilePreviewImage: FC<Props> = memo(({
  class: className,
  fileKey,
  timeout,
  isFullscreen,
  isVideo
}) => {
  const [url, setUrl] = useState('')
  const [ready, setReady] = useState(false)
  const [hidden, setHidden] = useState(false)

  const handleLoad = useCallback(() => {
    if (!url) return
    URL.revokeObjectURL(url)
  }, [url])

  useEffect(() => {
    if (!fileKey || url) return

    let file = getFile(fileKey)
    if (!file) return

    setUrl(URL.createObjectURL(file))
    file = undefined

    if (!ready) {
      if (timeout) {
        setTimeout(() => setReady(true), timeout)
      } else {
        setReady(true)
      }
    }
  }, [fileKey])

  useEffect(() => {
    setHidden(true)
    setTimeout(() => setHidden(false), 50)
  }, [isFullscreen])

  return !url ? null : (
    <Fragment>
      <img
        class={cn(
          className,
          styles.root,
          ready && styles._visible,
          hidden && styles._hidden
        )}
        src={url}
        onLoad={handleLoad}
      />
      {isVideo && (
        <div class={styles.icon}>
          <PlayIcon/>
        </div>
      )}
    </Fragment>
  )
})
