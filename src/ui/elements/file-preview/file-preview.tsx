import { h } from 'preact'
import type { FunctionComponent as FC } from 'preact'
import { useEffect } from 'preact/hooks'

import type { DownloadingFile } from '~/core/store'
import { useDownloadingFile } from '~/core/hooks'

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

  useEffect(() => {
    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> update')
    if (downloadingFile?.url) return

    if (mediaLoadAvailable) {
      console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! download')
      downloadFile(messageId, file)
    } else if (downloadingFile?.downloading) {
      pauseDownloadingFile(file)
    }
  }, [mediaLoadAvailable, file.file_reference])

  useEffect(() => {
    return () => {
      if (!downloadingFile?.url && downloadingFile?.downloading) {
        pauseDownloadingFile(file)
      }
    }
  }, [])

  return downloadingFile?.url ? (
    <img src={downloadingFile.url}/>
  ) : null
}
