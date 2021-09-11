import type { FunctionComponent as FC } from 'preact'
import { h } from 'preact'
import { memo, createPortal } from 'preact/compat'
import { useMemo, useState, useEffect, useCallback, useRef } from 'preact/hooks'

import { getFileUrl } from '~/core/cache'
import { Slide, useSlide } from '~/ui/elements/slide'
import { Button } from '~/ui/elements/button'

import styles from './file-popup.styl'

type Props = {
  fileKey: string
  fileType: string
  description?: string
  onClose: () => void
}

const bodyEl = self.document.body

export const FilePopup: FC<Props> = memo(({
  fileKey,
  fileType,
  description,
  onClose
}) => {
  const { closeSlide } = useSlide()
  const [url, setUrl] = useState('')
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const isImage = useMemo(() => {
    return fileType.startsWith('image')
  }, [fileType])

  const isVideo = useMemo(() => {
    return fileType.startsWith('video')
  }, [fileType])

  const isAudio = useMemo(() => {
    return fileType.startsWith('audio')
  }, [fileType])

  const handleIframeLoad = useCallback(() => {
    const iframeDocument = iframeRef.current?.contentDocument
    if (!iframeDocument) return

    const style = iframeDocument.createElement('style')
    style.innerText = 'html, body { width: 100%; height: 100%; overflow: auto;} img { max-width: 100% }'
    iframeDocument.head.appendChild(style)
  }, [])

  useEffect(() => {
    const url = getFileUrl(fileKey)
    setUrl(url)

    return () => URL.revokeObjectURL(url)
  }, [])

  return url ? createPortal((
    <Slide
      name="sidebar"
      class={styles.root}
      onClose={onClose}
    >
      <div class={styles.header}>
        {description}
        <Button
          class={styles.button}
          icon="cross"
          square
          onClick={closeSlide}
        />
      </div>

      {isImage ? (
        <img
          src={url}
        />
      ) : isVideo ? (
        <video
          src={url}
          preload="auto"
          controls
        />
      ) : isAudio ? (
        <audio
          src={url}
          preload="auto"
          controls
        />
      ) : url ? (
        <iframe
          src={url}
          ref={iframeRef}
          onLoad={handleIframeLoad}
        />
      ) : null}

    </Slide>
  ), bodyEl) : null
})
