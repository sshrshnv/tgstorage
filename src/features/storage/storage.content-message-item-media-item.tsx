import { h } from 'preact'
import type { FunctionComponent as FC } from 'preact'
import { useState, useCallback, useMemo, useEffect } from 'preact/hooks'
import { saveAs } from 'file-saver'

import type { Folder, Message, MessageMedia, DownloadingFile } from '~/core/store'
import { deleteMessage, downloadFile, pauseDownloadingFile } from '~/core/actions'
import { useTexts, useDownloadingFile } from '~/core/hooks'
import { ContentItemMediaItem } from '~/ui/elements/content-item-media-item'
import { DownloadIcon, DeleteIcon } from '~/ui/icons'

type Props = {
  folder: Folder
  message: Message
  mediaLoadAvailable: boolean
  compact: boolean
}

export const StorageContentMessageItemMediaItem: FC<Props> = ({
  folder,
  message,
  mediaLoadAvailable,
  compact
}) => {
  const { texts } = useTexts('storage')
  const [confirmation, setConfirmation] = useState(false)
  const [loading, setLoading] = useState(false)
  const [downloading, setDownloading] = useState(false)

  const media = message.media as MessageMedia
  const blurPreviewUrl = media.thumbMUrl || media.thumbSUrl

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

  const resetConfirmation = useCallback(() => {
    setConfirmation(false)
  }, [setConfirmation])

  const saveFile = useCallback(() => {
    const { url, blob, name } = originalDownloadingFile as DownloadingFile
    const data = url || blob as string | Blob
    saveAs(data, name)
    setDownloading(false)
  }, [
    originalDownloadingFile,
    setDownloading
  ])

  const handleDownload = useCallback(async () => {
    if (originalDownloadingFile?.url || originalDownloadingFile?.blob) {
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
    pauseDownloadingFile(originalDownloadingFile)
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
    if (thumbDownloadingFile?.url) return

    if (mediaLoadAvailable) {
      if (!thumbFile || thumbDownloadingFile?.downloading) return
      downloadFile(message.id, thumbFile)
    } else {
      if (!thumbDownloadingFile?.downloading) return
      pauseDownloadingFile(thumbDownloadingFile)
    }
  }, [mediaLoadAvailable, thumbFile?.file_reference])

  useEffect(() => {
    if (
      downloading &&
      originalFile &&
      !originalDownloadingFile?.url &&
      !originalDownloadingFile?.blob &&
      !originalDownloadingFile?.downloading
    ) {
      downloadFile(message.id, originalFile)
    }
  }, [originalFile?.file_reference])

  useEffect(() => {
    if (
      downloading &&
      (originalDownloadingFile?.url || originalDownloadingFile?.blob)
    ) {
      saveFile()
    }
  }, [originalDownloadingFile?.url, originalDownloadingFile?.blob])

  useEffect(() => () => {
    if (
      !thumbFile ||
      !originalDownloadingFile?.downloading ||
      originalDownloadingFile?.url
    ) return
    pauseDownloadingFile(thumbFile)
  }, [])

  return (
    <ContentItemMediaItem
      media={media}
      blurPreviewUrl={blurPreviewUrl}
      hasPreviewFile={!!thumbFile}
      previewFileUrl={thumbDownloadingFile?.url}
      menu={menu}
      compact={compact}
      loading={loading}
      downloading={downloading}
      downloadingProgress={downloading ? originalDownloadingFile?.progress : undefined}
      onCancelDownload={handleCancelDownload}
    />
  )
}
