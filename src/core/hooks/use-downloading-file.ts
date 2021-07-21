import { useMemo } from 'preact/hooks'
import { useStoreState } from 'unistore-hooks'

import type { State } from '~/core/store'
import { useUpdatableRef } from '~/tools/hooks'
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
  const downloadingFileRef = useUpdatableRef(downloadingFile)

  return useMemo(() => ({
    downloadingFile,
    downloadingFileRef
  }),
  // eslint-disable-next-line react-hooks/exhaustive-deps
  [
    downloadingFile?.fileKey,
    downloadingFile?.downloading,
    downloadingFile?.progress
  ])
}
