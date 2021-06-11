import { useMemo } from 'preact/hooks'
import { useStoreState } from 'unistore-hooks'

import type { State } from '~/core/store'

export const useFolders = () => {
  const {
    folders: foldersMap = new Map(),
    foldersLoading,
  }: {
    folders: State['folders']
    foldersLoading: State['foldersLoading']
  } = useStoreState(state => ({
    folders: state.folders,
    foldersLoading: state.foldersLoading,
  }))

  const folders = useMemo(() =>
    [...foldersMap.values()],
  [foldersMap])

  const categories = useMemo(() => [
    ...new Set(folders.map(folder => folder.category))
  ],
  [folders])

  return useMemo(() => ({
    folders,
    categories,
    foldersLoading
  }), [folders, foldersLoading])
}
