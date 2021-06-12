import { useMemo } from 'preact/hooks'
import { useStoreState } from 'unistore-hooks'

import type { State } from '~/core/store'
import { downloadFile, pauseDownloadingFile } from '~/core/actions'

export const useDownloadingFile = (file: {
  id: string
  size: number
}) => {
  const {
    downloadingFiles
  }: {
    downloadingFiles: State['downloadingFiles']
  } = useStoreState(state => ({
    downloadingFiles: state.downloadingFiles
  }))
  const downloadingFile = downloadingFiles.get(`${file.id}-${file.size}`)

  return useMemo(() => ({
    downloadingFile,
    downloadFile,
    pauseDownloadingFile
  }), [downloadingFile?.url, downloadingFile?.blob])
}
