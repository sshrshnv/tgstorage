import type { FunctionComponent as FC } from 'preact'
import { h } from 'preact'
import { memo } from 'preact/compat'
import { useCallback, useMemo, useState, useRef } from 'preact/hooks'

import type { Message, MessageMedia } from '~/core/store'
import { Gallery } from '~/ui/elements/gallery'
import { Fullscreen } from '~/ui/elements/fullscreen'

import { StorageContentMessageItemGalleryItem } from './storage.content-message-item-gallery-item'

type Props = {
  initialId: string
  mediaMessage?: Message
  mediaMessages?: {
    id: number
    media?: MessageMedia
  }[]
  onClose: () => void
}

export const StorageContentMessageItemGallery: FC<Props> = memo(({
  initialId,
  mediaMessage,
  mediaMessages,
  onClose
}) => {
  const galleryRef = useRef<HTMLDivElement>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isFakeFullscreen, setIsFakeFullscreen] = useState(false)

  const mediaList = useMemo(() => {
    const list = mediaMessage ? [{ id: mediaMessage.id, media: mediaMessage.media }] : []
    mediaMessages?.forEach(({ id, media }) => {
      if (media && ['image', 'video', 'audio'].includes(media.type?.split('/')?.[0] || '')) {
        list.push({ id, media })
      }
    })
    return list
  }, [mediaMessages]) as { id: number, media: MessageMedia }[]

  const initialIndex = useMemo(() => {
    return Math.max(0, mediaList.findIndex(({ media }) => media.id === initialId))
  }, [initialId, mediaList])

  const [currentIndex, setCurrentIndex] = useState(initialIndex)

  const currentName = useMemo(() => {
    return mediaList[currentIndex].media.name
  }, [mediaList, currentIndex])

  const handleIndexChange = useCallback(index => {
    setCurrentIndex(index)
  }, [setCurrentIndex])

  const handleFullscreenChange = useCallback((value, fake) => {
    if (fake) {
      setIsFakeFullscreen(fake)
    } else {
      setIsFullscreen(value)
    }
  }, [setIsFakeFullscreen, setIsFullscreen])

  return (
    <Gallery
      initialIndex={initialIndex}
      currentIndex={currentIndex}
      currentName={currentName}
      size={mediaList.length}
      galleryRef={galleryRef}
      isFullscreen={isFullscreen}
      isFakeFullscreen={isFakeFullscreen}
      onChangeIndex={handleIndexChange}
      onClose={onClose}
    >
      {mediaList.map(({ id, media }, index) => (
        <StorageContentMessageItemGalleryItem
          key={media.id}
          messageId={id}
          media={media}
          active={currentIndex === index}
          isFullscreen={isFullscreen}
          isFakeFullscreen={isFakeFullscreen}
        />
      ))}
      <Fullscreen
        isFullscreen={isFullscreen}
        forwardedRef={galleryRef}
        onChange={handleFullscreenChange}
      />
    </Gallery>
  )
})
