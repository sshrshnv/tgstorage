import type { FunctionComponent as FC } from 'preact'
import { h } from 'preact'
import { useState, useCallback, useMemo, useEffect } from 'preact/hooks'
import { saveAs } from 'file-saver'

import type { Folder, Message, MessageMedia, DownloadingFile } from '~/core/store'
import { useStateRef, useCallbackRef, useMemoRef, useUpdatableRef } from '~/tools/hooks'
import { deleteMessage, downloadFile, pauseDownloadingFile, resetDownloadingFile } from '~/core/actions'
import { useTexts, useDownloadingFile } from '~/core/hooks'
import { getFile } from '~/core/cache'
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
  const messageIdRef = useUpdatableRef(message.id)
  const media = message.media as MessageMedia
  const mediaRef = useUpdatableRef(media)
  const blurPreviewUrl = media.thumbSUrl

  const [thumbFile, thumbFileRef] = useMemoRef(() => {
    return media.thumbM ? {
      ...mediaRef.current,
      ...media.thumbM,
      file_reference: media.file_reference
    } as DownloadingFile : undefined
  }, [media.file_reference, media.thumbM])

  const [originalFile, originalFileRef] = useMemoRef(() => {
    return {
      ...mediaRef.current,
      size: media.originalSize,
      file_reference: media.file_reference
    } as DownloadingFile
  }, [media.file_reference, media.originalSize, mediaRef])

  const {
    downloadingFile: thumbDownloadingFile,
    downloadingFileRef: thumbDownloadingFileRef
  } = useDownloadingFile(thumbFile)

  const {
    downloadingFile: originalDownloadingFile,
    downloadingFileRef: originalDownloadingFileRef
  } = useDownloadingFile(originalFile)

  const [downloading, setDownloading, downloadingRef] = useStateRef(!!originalDownloadingFile?.downloading)

  const resetConfirmation = useCallback(() => {
    setConfirmation(false)
  }, [setConfirmation])

  const [saveFile, saveFileRef] = useCallbackRef(() => {
    if (!originalDownloadingFile?.fileKey) return
    const { fileKey, name } = originalDownloadingFile
    let file = getFile(fileKey)
    if (!file) return
    let data: Blob|undefined = checkIsIOS() ? file.slice() : file
    saveAs(data, name)
    file = undefined
    data = undefined
    setDownloading(false)
    resetDownloadingFile(originalDownloadingFile)
  }, [
    originalDownloadingFile,
    setDownloading
  ])

  const handleDownload = useCallback(async () => {
    if (originalDownloadingFile?.fileKey) {
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
    texts.mediaDownloadTitle,
    texts.confirmDeleteButton,
    texts.mediaDeleteTitle,
    handleDelete,
    handleDownload,
    resetConfirmation
  ])

  useEffect(() => {
    if (thumbDownloadingFileRef.current?.fileKey) return

    if (mediaLoadAvailable) {
      if (!thumbFileRef.current || thumbDownloadingFileRef.current?.downloading) return
      downloadFile(messageIdRef.current, thumbFileRef.current)
    } else {
      if (!thumbDownloadingFileRef.current?.downloading) return
      pauseDownloadingFile(thumbDownloadingFileRef.current)
    }
  }, [mediaLoadAvailable, thumbFile?.file_reference])

  useEffect(() => {
    if (
      downloadingRef.current &&
      originalFileRef.current &&
      !originalDownloadingFileRef.current?.fileKey &&
      !originalDownloadingFileRef.current?.downloading
    ) {
      downloadFile(messageIdRef.current, originalFileRef.current)
    }
  }, [originalFile?.file_reference])

  useEffect(() => {
    if (downloadingRef.current && originalDownloadingFile?.fileKey) {
      saveFileRef.current()
    }
  }, [originalDownloadingFile?.fileKey])

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
      previewFileKey={thumbDownloadingFile?.fileKey}
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
