import type { FunctionComponent as FC } from 'preact'
import { h } from 'preact'
import { useEffect, useMemo, useCallback } from 'preact/hooks'

import type { Folder, Message, MessageWebpage, DownloadingFile } from '~/core/store'
import { useMemoRef, useUpdatableRef } from '~/tools/hooks'
import { downloadFile, pauseDownloadingFile, refreshMessageWebpage } from '~/core/actions'
import { useTexts, useDownloadingFile } from '~/core/hooks'
import { ContentItemWebpage } from '~/ui/elements/content-item-webpage'
import { MoveIcon, CopyIcon } from '~/ui/icons'

type Props = {
  folder: Folder
  message: Message
  mediaLoadAvailable: boolean
}

export const StorageContentMessageItemWebpage: FC<Props> = ({
  folder,
  message,
  mediaLoadAvailable,
}) => {
  const { texts } = useTexts('storage')
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
    //
  }, [webpage.url])

  const menu = useMemo(() => ({
    items: [{
      title: texts.linkOpenTitle,
      icon: <MoveIcon/>,
      url: webpage.url
    }, {
      title: texts.linkCopyTitle,
      icon: <CopyIcon/>,
      onClick: handleCopyLink
    }]
  }), [
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
