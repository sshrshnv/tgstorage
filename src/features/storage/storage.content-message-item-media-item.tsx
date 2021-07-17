import type { FunctionComponent as FC } from 'preact'
import { h } from 'preact'
import { useState, useCallback, useMemo, useEffect, useRef } from 'preact/hooks'
import { saveAs } from 'file-saver'

import type { Folder, Message, MessageMedia, DownloadingFile } from '~/core/store'
import { deleteMessage, downloadFile, pauseDownloadingFile, resetDownloadingFile } from '~/core/actions'
import { useTexts, useDownloadingFile } from '~/core/hooks'
import { checkIsIOS } from '~/tools/detect-device'
import { ContentItemMediaItem } from '~/ui/elements/content-item-media-item'
import { DownloadIcon, DeleteIcon } from '~/ui/icons'

type Props = {
  folder: Folder
  message: Message
  mediaLoadAvailable: boolean
  compact?: boolean
  single?: boolean
  onPreviewClick?: (id: string) => void
}

export const StorageContentMessageItemMediaItem: FC<Props> = ({
  folder,
  message,
  mediaLoadAvailable,
  compact,
  single,
  onPreviewClick
}) => {
  const { texts } = useTexts('storage')
  const [confirmation, setConfirmation] = useState(false)
  const [loading, setLoading] = useState(false)

  const media = message.media as MessageMedia
  const blurPreviewUrl = media.thumbSUrl

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

  const thumbFileRef = useRef(thumbFile)
  const thumbDownloadingFileRef = useRef(thumbDownloadingFile)
  const originalDownloadingFileRef = useRef(originalDownloadingFile)

  const [downloading, setDownloading] = useState(!!originalDownloadingFile?.downloading)

  const resetConfirmation = useCallback(() => {
    setConfirmation(false)
  }, [setConfirmation])

  const saveFile = useCallback(() => {
    if (!originalDownloadingFile?.blob) return
    const { blob, name } = originalDownloadingFile
    const data = checkIsIOS() ? blob.slice() : blob
    saveAs(data, name)
    setDownloading(false)
    resetDownloadingFile(originalDownloadingFile)
  }, [
    originalDownloadingFile,
    setDownloading
  ])

  const handleDownload = useCallback(async () => {
    if (originalDownloadingFile?.blob) {
      saveFile()
    } else {
      setDownloading(true)
      downloadFile(message.id, originalFile)
    }
  }, [
    message.id,
    originalFile,
    originalDownloadingFile,
    saveFile,
    setDownloading
  ])

  const handleCancelDownload = useCallback(() => {
    if (!originalDownloadingFile) return
    resetDownloadingFile(originalDownloadingFile)
    setDownloading(false)
  }, [originalDownloadingFile, setDownloading])

  const handleDelete = useCallback(async (ev) => {
    if (confirmation) {
      setLoading(true)
      const success = await deleteMessage(message, folder)
      if (!success) {
        setLoading(false)
      }
      return
    }
    ev.stopPropagation()
    setConfirmation(true)
  }, [message, folder, confirmation])

  const menu = useMemo(() => ({
    items: [{
      title: texts.mediaDownloadTitle,
      icon: <DownloadIcon/>,
      onClick: handleDownload
    }, {
      title: confirmation ? texts.confirmDeleteButton : texts.mediaDeleteTitle,
      icon: <DeleteIcon/>,
      warning: !confirmation,
      danger: confirmation,
      onClick: handleDelete
    }],
    onClose: resetConfirmation
  }), [
    confirmation,
    handleDelete,
    handleDownload,
    resetConfirmation
  ])

  useEffect(() => {
    if (thumbDownloadingFileRef.current?.blob) return

    if (mediaLoadAvailable) {
      if (!thumbFile || thumbDownloadingFileRef.current?.downloading) return
      downloadFile(message.id, thumbFile)
    } else {
      if (!thumbDownloadingFileRef.current?.downloading) return
      pauseDownloadingFile(thumbDownloadingFileRef.current)
    }
  }, [mediaLoadAvailable, thumbFile?.file_reference])

  useEffect(() => {
    if (
      downloading &&
      originalFile &&
      !originalDownloadingFileRef.current?.blob &&
      !originalDownloadingFileRef.current?.downloading
    ) {
      downloadFile(message.id, originalFile)
    }
  }, [originalFile?.file_reference])

  useEffect(() => {
    if (downloading && originalDownloadingFile?.blob) {
      saveFile()
    }
  }, [originalDownloadingFile?.blob])

  useEffect(() => {
    thumbFileRef.current = thumbFile
  }, [thumbFile])

  useEffect(() => {
    thumbDownloadingFileRef.current = thumbDownloadingFile
  }, [thumbDownloadingFile])

  useEffect(() => () => {
    if (thumbDownloadingFileRef.current) {
      if (thumbDownloadingFileRef.current.downloading) {
        pauseDownloadingFile(thumbDownloadingFileRef.current)
      }
      thumbFileRef.current = undefined
      thumbDownloadingFileRef.current = undefined
    }

    if (originalDownloadingFileRef.current) {
      originalDownloadingFileRef.current = undefined
    }
  }, [])

  return (
    <ContentItemMediaItem
      media={media}
      blurPreviewUrl={blurPreviewUrl}
      hasPreviewFile={!!thumbFile}
      previewBlob={thumbDownloadingFile?.blob}
      menu={menu}
      compact={compact}
      single={single}
      loading={loading}
      downloading={downloading}
      downloadingProgress={downloading ? originalDownloadingFile?.progress : undefined}
      onCancelDownload={handleCancelDownload}
      onPreviewClick={onPreviewClick}
    />
  )
}
