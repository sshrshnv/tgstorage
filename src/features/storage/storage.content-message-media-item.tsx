import type { FunctionComponent as FC } from 'preact'
import { h, Fragment } from 'preact'
import { useState, useCallback, useMemo, useEffect, useRef } from 'preact/hooks'

import type { Folder, Message, MessageMedia, DownloadingFile } from '~/core/store'
import {
  deleteMessage, streamFile, downloadFile,
  pauseDownloadingFile, resetDownloadingFile
} from '~/core/actions'
import { useTexts, useDownloadingFile } from '~/core/hooks'
import { getFile } from '~/core/cache'
import { checkIsSWRegistered } from '~/sw'
import { useStateRef, useCallbackRef, useMemoRef, useUpdatableRef } from '~/tools/hooks'
import { checkIsSafari, checkIsIOS, getIOSVersion } from '~/tools/detect-platform'
import { saveFile, saveFileStream } from '~/tools/handle-file'
import { shareFile, checkIsSharingSupported } from '~/tools/share-data'
import { ContentItemMediaItem } from '~/ui/elements/content-item-media-item'
import { FilePopup } from '~/ui/elements/file-popup'

type Props = {
  folder: Folder
  message: Message
  mediaLoadAvailable: boolean
  single?: boolean
  onViewMedia?: (id: string) => void
}

export const StorageContentMessageMediaItem: FC<Props> = ({
  folder,
  message,
  mediaLoadAvailable,
  single,
  onViewMedia
}) => {
  const { texts } = useTexts('storage')
  const [confirmation, setConfirmation] = useState(false)
  const [sharingConfirmation, setSharingConfirmation] = useState(false)
  const [loading, setLoading] = useState(false)
  const [filePopup, setFilePopup] = useState(false)
  const messageIdRef = useUpdatableRef(message.id)
  const media = message.media as MessageMedia
  const mediaRef = useUpdatableRef(media)
  const blurPreviewUrl = media.thumbSUrl

  const [thumbFile, thumbFileRef] = useMemoRef(() => {
    return media.thumbM || media.thumbVideo ? {
      ...mediaRef.current,
      ...(media.thumbM || media.thumbVideo),
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
  const sharingRef = useRef(false)

  const isSharingSupported = useMemo(() => {
    return checkIsSharingSupported(originalFile)
  }, [originalFile.name, originalFile.size, originalFile.type])

  const resetConfirmation = useCallback(() => {
    setConfirmation(false)
  }, [setConfirmation])

  const resetSharingConfirmation = useCallback(() => {
    if (sharingRef.current) {
      sharingRef.current = false
    }
    setSharingConfirmation(false)
  }, [setSharingConfirmation])

  const [trySaveFile, trySaveFileRef] = useCallbackRef(async () => {
    if (!originalDownloadingFile?.fileKey) return

    if (checkIsIOS() && getIOSVersion() < 14.8) {
      setFilePopup(true)
    } else {
      await saveFile(originalDownloadingFile)
    }
    setDownloading(false)
  }, [
    originalDownloadingFile,
    setDownloading,
    setFilePopup
  ])

  const [tryShareFile, tryShareFileRef] = useCallbackRef(async () => {
    sharingRef.current = false
    setDownloading(false)

    if (!originalDownloadingFile?.fileKey) return
    const { fileKey, name } = originalDownloadingFile

    let file = getFile(fileKey)
    if (!file) return

    file = new File([file], name || 'unknown', { type: file.type })
    const error = await shareFile(file as File)?.catch(error => error)

    file = undefined
    if (error?.name === 'NotAllowedError') {
      sharingRef.current = true
      setSharingConfirmation(true)
    } else {
      sharingRef.current = false
    }
  }, [
    originalDownloadingFile,
    setSharingConfirmation,
    setDownloading
  ])

  const startStreamFile = useCallback(() => {
    if (originalDownloadingFile?.fileKey) {
      trySaveFile()
    } else {
      const fileStreamUrl = streamFile(message.id, originalFile, true)
      saveFileStream(fileStreamUrl)
    }
  }, [
    message.id,
    originalFile,
    originalDownloadingFile,
    trySaveFile
  ])

  const startDownloadFile = useCallback(() => {
    if (originalDownloadingFile?.fileKey) {
      if (sharingRef.current) {
        tryShareFile()
      } else {
        trySaveFile()
      }
    } else {
      setDownloading(true)
      downloadFile(message.id, originalFile)
    }
  }, [
    message.id,
    originalFile,
    originalDownloadingFile,
    tryShareFile,
    trySaveFile,
    setDownloading
  ])

  const handleStartDownload = useCallback(() => {
    if (checkIsSWRegistered() && !checkIsSafari()) {
      startStreamFile()
    } else {
      startDownloadFile()
    }
  }, [startDownloadFile, startStreamFile])

  const handleCancelDownload = useCallback(() => {
    sharingRef.current = false
    if (!originalDownloadingFile) return
    resetDownloadingFile(originalDownloadingFile)
    setDownloading(false)
  }, [originalDownloadingFile, setDownloading])

  const handleCloseFilePopup = useCallback(() => {
    setFilePopup(false)
  }, [setFilePopup])

  const handleShare = useCallback(async () => {
    if (sharingRef.current) {
      tryShareFile()
    } else {
      sharingRef.current = true
      startDownloadFile()
    }
  }, [startDownloadFile, tryShareFile])

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
    items: [!sharingConfirmation ? {
      title: texts.mediaDownloadTitle,
      icon: 'download',
      onClick: handleStartDownload
    } : null, isSharingSupported ? {
      title: texts.mediaShareTitle,
      icon: 'share',
      onClick: handleShare,
    } : null, !sharingConfirmation ? {
      title: confirmation ? texts.confirmDeleteButton : texts.mediaDeleteTitle,
      icon: 'delete',
      warning: !confirmation,
      danger: confirmation,
      onClick: handleDelete
    } : null],
    forceOpened: sharingConfirmation,
    onClose:
      confirmation ? resetConfirmation :
        sharingConfirmation ? resetSharingConfirmation :
          undefined
  }), [
    confirmation,
    sharingConfirmation,
    isSharingSupported,
    texts.mediaShareTitle,
    texts.mediaDownloadTitle,
    texts.confirmDeleteButton,
    texts.mediaDeleteTitle,
    handleShare,
    handleDelete,
    handleStartDownload,
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
      if (sharingRef.current) {
        tryShareFileRef.current?.()
      } else {
        trySaveFileRef.current?.()
      }
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
    <Fragment>
      <ContentItemMediaItem
        media={media}
        blurPreviewUrl={blurPreviewUrl}
        hasPreviewFile={!!thumbFile}
        previewFileKey={thumbDownloadingFile?.fileKey}
        menu={menu}
        single={single}
        loading={loading}
        downloading={downloading}
        downloadingProgress={downloading ? originalDownloadingFile?.progress : undefined}
        onCancelDownload={handleCancelDownload}
        onViewMedia={onViewMedia}
      />

      {(filePopup && !!originalDownloadingFile?.fileKey) && (
        <FilePopup
          fileKey={originalDownloadingFile.fileKey}
          fileType={originalDownloadingFile.type}
          description={texts.mediaDownloadDescription}
          onClose={handleCloseFilePopup}
        />
      )}
    </Fragment>
  )
}
