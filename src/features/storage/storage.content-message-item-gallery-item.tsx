import type { FunctionComponent as FC } from 'preact'
import { h } from 'preact'
import { memo } from 'preact/compat'
import { useEffect, useState } from 'preact/hooks'

import type { MessageMedia, DownloadingFile } from '~/core/store'
import { useMemoRef, useUpdatableRef } from '~/tools/hooks'
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
  const messageIdRef = useUpdatableRef(messageId)
  const mediaRef = useUpdatableRef(media)
  const [streamFileUrl, setStreamFileUrl] = useState('')

  const [isVideo, isVideoRef] = useMemoRef(() => {
    return media.type.startsWith('video')
  }, [media.type])

  const [isAudio, isAudioRef] = useMemoRef(() => {
    return media.type.startsWith('audio')
  }, [media.type])

  const [thumbFile] = useMemoRef(() => {
    return media.thumbM ? {
      ...mediaRef.current,
      ...media.thumbM,
      file_reference: media.file_reference
    } as DownloadingFile : undefined
  }, [media.file_reference, media.thumbM, mediaRef])

  const [originalFile, originalFileRef] = useMemoRef(() => {
    return {
      ...mediaRef.current,
      size: media.originalSize,
      file_reference: media.file_reference
    } as DownloadingFile
  }, [media.file_reference, media.originalSize, mediaRef])

  const {
    downloadingFile: thumbDownloadingFile
  } = useDownloadingFile(thumbFile)

  const {
    downloadingFile: originalDownloadingFile,
    downloadingFileRef: originalDownloadingFileRef
  } = useDownloadingFile(originalFile)

  useEffect(() => {
    if (
      !active ||
      !(isVideoRef.current || isAudioRef.current) ||
      !checkIsSWRegistered()
    ) return

    const streamFileUrl = streamFile(messageIdRef.current, originalFileRef.current)
    setStreamFileUrl(streamFileUrl)
  }, [active, isVideoRef, isAudioRef, messageIdRef, originalFileRef])

  useEffect(() => {
    if (
      !active ||
      !originalFileRef.current ||
      ((isVideoRef.current || isAudioRef.current) && checkIsSWRegistered()) ||
      originalDownloadingFileRef.current?.fileKey ||
      originalDownloadingFileRef.current?.downloading
    ) return

    downloadFile(messageIdRef.current, originalFileRef.current)

    return () => {
      if (!originalDownloadingFileRef.current?.downloading) return
      pauseDownloadingFile(originalDownloadingFileRef.current)
    }
  }, [active, originalFile?.file_reference, messageIdRef, originalFileRef, isVideoRef, isAudioRef, originalDownloadingFileRef])

  useEffect(() => () => {
    if (originalDownloadingFileRef.current) {
      if (originalDownloadingFileRef.current.downloading) {
        pauseDownloadingFile(originalDownloadingFileRef.current)
      }

      originalDownloadingFileRef.current = undefined
    }
  }, [originalDownloadingFileRef])

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
