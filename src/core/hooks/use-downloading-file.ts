import { useMemo } from 'preact/hooks'
import { useStoreState } from 'unistore-hooks'

import type { State } from '~/core/store'

export const useDownloadingFile = (file: {
  id: string
  size: number
} | undefined) => {
  const {
    downloadingFiles
  }: {
    downloadingFiles: State['downloadingFiles']
  } = useStoreState(state => ({
    downloadingFiles: state.downloadingFiles
  }))
  const downloadingFile = file ?
    downloadingFiles.get(`${file.id}-${file.size}`) :
    undefined

  return useMemo(() => ({
    downloadingFile
  }), [
    downloadingFile?.blob,
    downloadingFile?.downloading,
    downloadingFile?.progress,
  ])
}
