import type { FunctionComponent as FC } from 'preact'
import { h } from 'preact'
import { memo } from 'preact/compat'
import { useMemo, useEffect, useRef } from 'preact/hooks'

import type { MessageMedia, DownloadingFile } from '~/core/store'
import { downloadFile, pauseDownloadingFile } from '~/core/actions'
import { useDownloadingFile } from '~/core/hooks'
import { GalleryItem } from '~/ui/elements/gallery-item'

type Props = {
  messageId: number
  media: MessageMedia
  active?: boolean
  isFullscreen?: boolean
  isFakeFullscreen?: boolean
}

export const StorageContentMessageItemGalleryItem: FC<Props> = memo(({
  messageId,
  media,
  active,
  isFullscreen,
  isFakeFullscreen
}) => {
  const isVideo = useMemo(() => {
    return media.type.startsWith('video')
  }, [media.type])

  const isAudio = useMemo(() => {
    return media.type.startsWith('audio')
  }, [media.type])

  const thumbFile = useMemo(() => {
    return media.thumbM ? { ...media, ...media.thumbM } as DownloadingFile : undefined
  }, [media.file_reference, media.thumbM])

  const originalFile = useMemo(() => {
    return { ...media, size: media.originalSize } as DownloadingFile
  }, [media.file_reference])

  const {
    downloadingFile: thumbDownloadingFile
  } = useDownloadingFile(thumbFile)

  const {
    downloadingFile: originalDownloadingFile
  } = useDownloadingFile(originalFile)

  const originalDownloadingFileRef = useRef(originalDownloadingFile)

  useEffect(() => {
    if (
      !active ||
      !originalFile ||
      originalDownloadingFileRef.current?.blob ||
      originalDownloadingFileRef.current?.downloading
    ) return

    downloadFile(messageId, originalFile)

    return () => {
      if (!originalDownloadingFileRef.current?.downloading) return
      pauseDownloadingFile(originalDownloadingFileRef.current)
    }
  }, [active, originalFile?.file_reference])

  useEffect(() => {
    originalDownloadingFileRef.current = originalDownloadingFile
  }, [originalDownloadingFile])

  useEffect(() => () => {
    if (originalDownloadingFileRef.current) {
      if (originalDownloadingFileRef.current.downloading) {
        pauseDownloadingFile(originalDownloadingFileRef.current)
      }

      originalDownloadingFileRef.current = undefined
    }
  }, [])

  return (
    <GalleryItem
      thumbBlob={isVideo ? thumbDownloadingFile?.blob : undefined}
      blob={originalDownloadingFile?.blob}
      type={originalFile.type}
      name={media.name}
      description={media.description}
      duration={media.duration}
      progress={originalDownloadingFile?.progress}
      isFullscreen={isFullscreen}
      isFakeFullscreen={isFakeFullscreen}
      active={active}
      isVideo={isVideo}
      isAudio={isAudio}
    />
  )
})
