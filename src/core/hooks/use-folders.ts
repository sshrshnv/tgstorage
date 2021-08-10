import { useMemo } from 'preact/hooks'
import { useStoreState } from 'unistore-hooks'

import type { State } from '~/core/store'
import { useTexts } from '~/core/hooks'

export const useFolders = () => {
  const { texts } = useTexts('storage')
  const {
    folders: foldersMap = new Map(),
    foldersLoading
  }: {
    folders: State['folders']
    foldersLoading: State['foldersLoading']
  } = useStoreState(state => ({
    folders: state.folders,
    foldersLoading: state.foldersLoading,
  }))

  const folders = useMemo(() =>
    [...foldersMap.values()].map(folder => folder.general ? ({
      ...folder,
      title: texts.generalFolderTitle
    }): folder),
  [foldersMap, texts.generalFolderTitle])

  const categories = useMemo(() => [
    ...new Set(folders.map(folder => folder.category))
  ],
  [folders])

  return useMemo(() => ({
    folders,
    categories,
    foldersLoading
  }), [folders, categories, foldersLoading])
}
