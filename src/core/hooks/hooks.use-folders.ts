import { useMemo } from 'preact/hooks'
import { useStoreState } from 'unistore-hooks'

import type { State, Folder } from '~/core/store'
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

  return useMemo(() => ({
    folders,
    foldersLoading,
    foldersCount: folders.length
  }), [folders, foldersLoading])
}

export const useFoldersParams = (
  folders: Folder[]
) => {
  const categories = useMemo(() => [
    ...new Set(folders.map(folder => folder.category))
  ],
  [folders])

  const groups = useMemo(() => categories.reduce((obj, category) => ({
    ...obj,
    [category]: [
      ...new Set(folders.filter(folder => folder.category === category && !!folder.group).map(folder => folder.group))
    ]
  }), {}),
  [folders, categories])

  return useMemo(() => ({
    groups,
    categories
  }), [groups, categories])
}
