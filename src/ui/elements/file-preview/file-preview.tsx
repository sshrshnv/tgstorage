import { h } from 'preact'
import type { FunctionComponent as FC } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import cn from 'classnames'

import type { DownloadingFile } from '~/core/store'
import { useDownloadingFile } from '~/core/hooks'

import styles from './file-preview.styl'

type Props = {
  messageId: number
  file: DownloadingFile
  mediaLoadAvailable: boolean
}

export const FilePreview: FC<Props> = ({
  messageId,
  file,
  mediaLoadAvailable
}) => {
  const {
    downloadingFile,
    downloadFile,
    pauseDownloadingFile
  } = useDownloadingFile(file)
  const [ready, setReady] = useState(!!downloadingFile?.url)

  useEffect(() => {
    if (downloadingFile?.url) return

    if (mediaLoadAvailable) {
      if (downloadingFile?.downloading) return
      downloadFile(messageId, file)
    } else {
      if (!downloadingFile?.downloading) return
      pauseDownloadingFile(file)
    }
  }, [mediaLoadAvailable])

  useEffect(() => {
    if (!downloadingFile?.url || ready) return
    setReady(true)
  }, [downloadingFile?.url])

  useEffect(() => () => {
    if (downloadingFile?.url || !downloadingFile?.downloading) return
    pauseDownloadingFile(file)
  }, [])

  return !!downloadingFile?.url ? (
    <img
      class={cn(
        styles.root,
        ready && styles._visible
      )}
      src={downloadingFile.url}
    />
  ) : null
}
