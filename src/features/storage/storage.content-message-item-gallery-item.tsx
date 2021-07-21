import type { FunctionComponent as FC } from 'preact'
import { h } from 'preact'
import { memo } from 'preact/compat'
import { useMemo, useEffect, useRef, useState } from 'preact/hooks'

import type { MessageMedia, DownloadingFile } from '~/core/store'
import { downloadFile, pauseDownloadingFile, streamFile } from '~/core/actions'
import { useDownloadingFile } from '~/core/hooks'
import { checkIsSWRegistered } from '~/sw'
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
  const [streamFileUrl, setStreamFileUrl] = useState('')

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
      !(isVideo || isAudio) ||
      !checkIsSWRegistered()
    ) return

    const streamFileUrl = streamFile(messageId, originalFile)
    setStreamFileUrl(streamFileUrl)
  }, [active])

  useEffect(() => {
    if (
      !active ||
      !originalFile ||
      ((isVideo || isAudio) && checkIsSWRegistered()) ||
      originalDownloadingFileRef.current?.fileKey ||
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
      thumbFileKey={isVideo ? thumbDownloadingFile?.fileKey : undefined}
      fileKey={originalDownloadingFile?.fileKey}
      streamFileUrl={streamFileUrl}
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
