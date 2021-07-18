import { useMemo } from 'preact/hooks'
import { useStoreState } from 'unistore-hooks'

import type { State } from '~/core/store'
import { generateFileKey } from '~/tools/handle-file'

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
    downloadingFiles.get(generateFileKey(file)) :
    undefined

  return useMemo(() => ({
    downloadingFile
  }), [
    downloadingFile?.fileKey,
    downloadingFile?.downloading,
    downloadingFile?.progress,
  ])
}
