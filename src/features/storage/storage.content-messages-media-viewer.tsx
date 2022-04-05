import type { FunctionComponent as FC } from 'preact'
import { h } from 'preact'
import { memo } from 'preact/compat'
import { useCallback, useMemo, useState, useRef } from 'preact/hooks'

import type { Message } from '~/core/store'
import { useCallbackRef, useMemoRef, useStateRef } from '~/tools/hooks'
import { useDispaySize } from '~/ui/hooks'
import type { Transform } from '~/ui/elements/media-viewer'
import { MediaViewer, INITIAL_TRANSFORM } from '~/ui/elements/media-viewer'

import { StorageContentMessagesMediaViewerItem } from './storage.content-messages-media-viewer-item'

type Props = {
  initialId: string
  messages: Message[]
  onClose: () => void
}

export const StorageContentMessagesMediaViewer: FC<Props> = memo(({
  initialId,
  messages,
  onClose
}) => {
  const mediaElRef = useRef<HTMLImageElement|null>(null)
  const displaySize = useDispaySize()
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isFakeFullscreen, setIsFakeFullscreen] = useState(false)
  const [transform, _setTransform, transformRef, setTransformRef] = useStateRef<Transform>(INITIAL_TRANSFORM)
  const [transition, _setTransition, _transitionRef, setTransitionRef] = useStateRef(true)

  const { mediaMessages, initialIndex } = useMemo(() => {
    return filterMediaMessages(messages, initialId)
  }, [messages])

  const [mediaMessagesCount, mediaMessagesCountRef] = useMemoRef(() => {
    return mediaMessages.length
  }, [mediaMessages.length])

  const [activeIndex, _setActiveIndex, _activeIndexRef, setActiveIndexRef] = useStateRef(initialIndex)

  const [_showNext, showNextRef] = useCallbackRef(() => {
    setActiveIndexRef.current?.(activeIndex => Math.min(mediaMessagesCountRef.current - 1, activeIndex + 1))
    setTransformRef.current?.(INITIAL_TRANSFORM)
  }, [])

  const [_showPrev, showPrevRef] = useCallbackRef(() => {
    setActiveIndexRef.current?.(activeIndex => Math.max(0, activeIndex - 1))
    setTransformRef.current?.(INITIAL_TRANSFORM)
  }, [])

  const handleFullscreenChange = useCallback((value: boolean, fake?: boolean) => {
    if (fake) {
      setIsFakeFullscreen(fake)
    } else {
      setIsFullscreen(value)
    }
  }, [setIsFakeFullscreen, setIsFullscreen])

  return (
    <MediaViewer
      name={mediaMessages[activeIndex]?.media?.name}
      size={mediaMessagesCount}
      displaySize={displaySize}
      isFirst={activeIndex === 0}
      isLast={activeIndex === mediaMessages.length - 1}
      isFullscreen={isFullscreen}
      isFakeFullscreen={isFakeFullscreen}
      mediaElRef={mediaElRef}
      transformRef={transformRef}
      setTransformRef={setTransformRef}
      setTransitionRef={setTransitionRef}
      showNextRef={showNextRef}
      showPrevRef={showPrevRef}
      onFullscreenChange={handleFullscreenChange}
      onClose={onClose}
    >
      {[-1, 0, 1].map(k => {
        const mediaMessage = mediaMessages[activeIndex + k]
        const { x, y, scale } = transform
        return mediaMessage?.media ? (
          <StorageContentMessagesMediaViewerItem
            key={mediaMessage.media.id}
            messageId={mediaMessage.id}
            media={mediaMessage.media}
            k={k}
            x={((k < 0 && x < 0) || (k > 0 && x > 0) || (k !== 0 && scale !== 1)) ? 0 : x}
            y={k === 0 ? y : 0}
            scale={k === 0 ? scale : 1}
            mediaElRef={k === 0 ? mediaElRef : undefined}
            transition={k === 0 ? transition : (transition && scale === 1)}
            displaySize={displaySize}
            isActive={k === 0}
            isFullscreen={isFullscreen}
            isFakeFullscreen={isFakeFullscreen}
          />
        ) : (
          <div/>
        )
      })}
    </MediaViewer>
  )
})

const filterMediaMessages = (
  messages: Message[],
  initialId: string
): {
  mediaMessages: Message[]
  initialIndex: number
} => {
  const mediaMessages: Message[] = []
  let initialIndex = 0

  const checkMessageMedia = (message: Message) => {
    if (message.media && ['image', 'video', 'audio'].includes(message.media.type?.split('/')?.[0] || '')) {
      mediaMessages.push(message)
    }
    if (message.media?.id === initialId) {
      initialIndex = mediaMessages.length - 1
    }
  }

  messages.forEach(message => {
    checkMessageMedia(message)
    message.mediaMessages?.forEach(message => checkMessageMedia(message))
  })

  return { mediaMessages, initialIndex }
}
