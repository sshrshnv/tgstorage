import type { FunctionComponent as FC, RefObject } from 'preact'
import { h } from 'preact'
import { memo } from 'preact/compat'
import { useEffect, useState, useCallback } from 'preact/hooks'
import cn from 'classnames'

import { getFileUrl } from '~/core/cache'
import { useStateRef, useUpdatableRef } from '~/tools/hooks'

import styles from './file-view-image.styl'

type Props = {
  class?: string
  fileKey?: string
  timeout?: number
  mediaElRef?: RefObject<HTMLImageElement>
  isFullscreen?: boolean
}

export const FileViewImage: FC<Props> = memo(({
  class: outerStyles,
  fileKey,
  timeout,
  mediaElRef,
  isFullscreen
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

    setUrlRef.current?.(url)
    url = ''

    if (!readyRef.current) {
      if (timeoutRef.current) {
        setTimeout(() => setReadyRef.current?.(true), timeoutRef.current)
      } else {
        setReadyRef.current?.(true)
      }
    }
  }, [fileKey])

  useEffect(() => {
    setHidden(true)
    setTimeout(() => setHidden(false), 50)
  }, [isFullscreen])

  return !url ? null : (
    <img
      class={cn(
        outerStyles,
        styles.root,
        ready && styles._visible,
        hidden && styles._hidden
      )}
      src={url}
      ref={mediaElRef}
      onLoad={handleLoad}
    />
  )
})
