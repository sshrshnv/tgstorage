import type { FunctionComponent as FC, RefObject } from 'preact'
import { h } from 'preact'
import { memo } from 'preact/compat'
import { useEffect, useState } from 'preact/hooks'

import type { MessageMedia, DownloadingFile } from '~/core/store'
import type { DisplaySize } from '~/ui/hooks'
import { downloadFile, pauseDownloadingFile, streamFile } from '~/core/actions'
import { useDownloadingFile } from '~/core/hooks'
import { checkIsSWRegistered } from '~/sw'
import { useMemoRef, useUpdatableRef } from '~/tools/hooks'
import { MediaViewerItem } from '~/ui/elements/media-viewer-item'

type Props = {
  messageId: number
  media: MessageMedia
  k: number
  x: number
  y: number
  scale: number
  mediaElRef?: RefObject<HTMLImageElement>
  transition: boolean
  displaySize: DisplaySize
  isActive?: boolean
  isFullscreen?: boolean
  isFakeFullscreen?: boolean
}

export const StorageContentMessagesMediaViewerItem: FC<Props> = memo(({
  messageId,
  media,
  k,
  x,
  y,
  scale,
  mediaElRef,
  transition,
  displaySize,
  isActive,
  isFullscreen,
  isFakeFullscreen
}) => {
  const messageIdRef = useUpdatableRef(messageId)
  const mediaRef = useUpdatableRef(media)
  const [fileStreamUrl, setFileStreamUrl] = useState('')

  const [isImage, _isImageRef] = useMemoRef(() => {
    return media.type.startsWith('image')
  }, [media.type])

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
    if (isImage || !mediaElRef?.current) return
    mediaElRef.current = null
  }, [k, isImage])

  useEffect(() => {
    if (
      !isActive ||
      !(isVideoRef.current || isAudioRef.current) ||
      !checkIsSWRegistered()
    ) return

    const fileStreamUrl = streamFile(messageIdRef.current, originalFileRef.current)
    setFileStreamUrl(fileStreamUrl)
  }, [isActive])

  useEffect(() => {
    if (
      !isActive &&
      !originalDownloadingFileRef.current?.fileKey &&
      originalDownloadingFileRef.current?.downloading
    ) {
      pauseDownloadingFile(originalDownloadingFileRef.current)
      return
    }

    if (
      !isActive ||
      !originalFileRef.current ||
      ((isVideoRef.current || isAudioRef.current) && checkIsSWRegistered()) ||
      originalDownloadingFileRef.current?.fileKey ||
      originalDownloadingFileRef.current?.downloading
    ) return

    downloadFile(messageIdRef.current, originalFileRef.current)
  }, [isActive, originalFile?.file_reference])

  useEffect(() => () => {
    if (originalDownloadingFileRef.current) {
      if (originalDownloadingFileRef.current.downloading) {
        pauseDownloadingFile(originalDownloadingFileRef.current)
      }

      originalDownloadingFileRef.current = undefined
    }
  }, [])

  return (
    <MediaViewerItem
      thumbFileKey={isVideo ? thumbDownloadingFile?.fileKey : undefined}
      fileKey={originalDownloadingFile?.fileKey}
      fileStreamUrl={fileStreamUrl}
      type={originalFile.type}
      name={media.name}
      description={media.description}
      duration={media.duration}
      progress={originalDownloadingFile?.progress}
      k={k}
      x={x}
      y={y}
      scale={scale}
      mediaElRef={isImage ? mediaElRef : undefined}
      transition={transition}
      displaySize={displaySize}
      isActive={isActive}
      isFullscreen={isFullscreen}
      isFakeFullscreen={isFakeFullscreen}
      isVideo={isVideo}
      isAudio={isAudio}
    />
  )
})
