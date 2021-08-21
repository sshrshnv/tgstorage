import { h, Fragment } from 'preact'
import type { FunctionComponent as FC } from 'preact'
import { memo } from 'preact/compat'
import { useEffect, useState, useCallback } from 'preact/hooks'
import cn from 'classnames'

import { getFileUrl } from '~/core/cache'
import { useStateRef, useUpdatableRef } from '~/tools/hooks'
import { PlayIcon, LinkIcon } from '~/ui/icons'

import styles from './file-preview-image.styl'

type Props = {
  class?: string
  fileKey?: string
  timeout?: number
  isFullscreen?: boolean
  isPlay?: boolean
  isLink?: boolean
}

export const FilePreviewImage: FC<Props> = memo(({
  class: className,
  fileKey,
  timeout,
  isFullscreen,
  isPlay,
  isLink
}) => {
  const [url, _setUrl, urlRef, setUrlRef] = useStateRef('')
  const [ready, _setReady, readyRef, setReadyRef] = useStateRef(false)
  const [hidden, setHidden] = useState(false)
  const timeoutRef = useUpdatableRef(timeout)

  const handleLoad = useCallback(() => {
    if (!url) return
    URL.revokeObjectURL(url)
  }, [url])

  useEffect(() => {
    if (!fileKey || urlRef.current) return

    let url = getFileUrl(fileKey)
    if (!url) return

    setUrlRef.current(url)
    url = ''

    if (!readyRef.current) {
      if (timeoutRef.current) {
        setTimeout(() => setReadyRef.current(true), timeoutRef.current)
      } else {
        setReadyRef.current(true)
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
      {(isPlay || isLink) && (
        <div class={cn(
          styles.icon,
          isLink && styles._transform
        )}>
          {isPlay && (
            <PlayIcon/>
          )}
          {isLink && (
            <LinkIcon/>
          )}
        </div>
      )}
    </Fragment>
  )
})
