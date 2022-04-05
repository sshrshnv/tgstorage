import type { FunctionComponent as FC } from 'preact'
import { h } from 'preact'
import { useEffect, useMemo, useCallback, useState } from 'preact/hooks'

import type { Folder, Message, MessageWebpage, DownloadingFile } from '~/core/store'
import { downloadFile, pauseDownloadingFile, refreshMessageWebpage } from '~/core/actions'
import { useTexts, useDownloadingFile } from '~/core/hooks'
import { useMemoRef, useUpdatableRef } from '~/tools/hooks'
import { COPY_TIMEOUT, copyText } from '~/tools/copy-text'
import { shareLink, checkIsSharingSupported } from '~/tools/share-data'
import { ContentItemWebpage } from '~/ui/elements/content-item-webpage'

type Props = {
  folder: Folder
  message: Message
  mediaLoadAvailable: boolean
}

export const StorageContentMessageWebpage: FC<Props> = ({
  folder,
  message,
  mediaLoadAvailable,
}) => {
  const { texts } = useTexts('storage')
  const [coping, setCoping] = useState(false)
  const messageIdRef = useUpdatableRef(message.id)
  const webpage = message.webpage as MessageWebpage
  const webpageRef = useUpdatableRef(webpage)
  const webpageFile = webpage.file
  const blurPreviewUrl = webpageFile?.thumbSUrl

  const [thumbFile, thumbFileRef] = useMemoRef(() => {
    return webpageFile?.thumbM ? {
      ...webpageRef.current.file,
      ...webpageFile?.thumbM,
      file_reference: webpageFile?.file_reference
    } as DownloadingFile : undefined
  }, [webpageFile?.file_reference, webpageFile?.thumbM])

  const {
    downloadingFile: thumbDownloadingFile,
    downloadingFileRef: thumbDownloadingFileRef
  } = useDownloadingFile(thumbFile)

  const handleCopyLink = useCallback(() => {
    setCoping(true)
    copyText(webpage.url || '')
  }, [webpage.url, setCoping])

  const handleShareLink = useCallback(() => {
    shareLink(webpage.url || '')
  }, [webpage.url])

  const resetCoping = useCallback(() => {
    setCoping(false)
  }, [setCoping])

  const menu = useMemo(() => ({
    items: [{
      title: texts.linkOpenTitle,
      icon: 'move',
      url: webpage.url
    }, {
      title: coping ? texts.linkCopiedTitle : texts.linkCopyTitle,
      icon: coping ? 'check' : 'copy',
      onClick: handleCopyLink
    }, checkIsSharingSupported() ? {
      title: texts.linkShareTitle,
      icon: 'share',
      onClick: handleShareLink
    }: null],
    closeTimeout: coping ? COPY_TIMEOUT : 0,
    onClose: coping ? resetCoping : undefined
  }), [
    coping,
    texts.linkOpenTitle,
    texts.linkCopyTitle,
    texts.linkCopiedTitle,
    handleCopyLink,
    handleShareLink,
    resetCoping
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
    if (webpageRef.current.pending) {
      refreshMessageWebpage(folder, message.id)
    }
  }, [])

  useEffect(() => () => {
    if (thumbDownloadingFileRef.current) {
      if (thumbDownloadingFileRef.current.downloading) {
        pauseDownloadingFile(thumbDownloadingFileRef.current)
      }
      thumbFileRef.current = undefined
      thumbDownloadingFileRef.current = undefined
    }
  }, [])

  return (
    <ContentItemWebpage
      webpage={webpage}
      blurPreviewUrl={blurPreviewUrl}
      hasPreviewFile={!!thumbFile}
      previewFileKey={thumbDownloadingFile?.fileKey}
      loading={webpage.pending}
      menu={menu}
      single
    />
  )
}
