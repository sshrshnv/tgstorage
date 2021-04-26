import { useMemo } from 'preact/hooks'
import { useStoreState } from 'unistore-hooks'

import type { State, Locales, Folders } from './store'

export const useTexts = (feature?: 'auth'|'storage') => {
  const {
    texts
  }: {
    texts: State['texts'][Locales]
  } = useStoreState(state => ({
    texts: feature ?
      state.texts[state.settings.locale][feature] :
      state.texts[state.settings.locale]
  }))

  return useMemo(() => ({
    texts
  }), [feature])
}

export const useSettings = () => {
  const { locale }: {
    locale: State['settings']['locale']
  } = useStoreState(state => ({
    locale: state.settings.locale
  }))

  return useMemo(() => ({
    locale
  }), [locale])
}

export const useUser = () => {
  const { user, userLoading }: {
    user: State['user']
    userLoading: State['userLoading']
  } = useStoreState(state => ({
    user: state.user,
    userLoading: state.userLoading
  }))

  return useMemo(() => ({
    user,
    userLoading
  }), [user?.id, userLoading])
}

export const useFolders = () => {
  const {
    folders: loadedFolders = [],
    foldersLoading,
    user,
    texts,
  }: {
    folders: State['folders']
    foldersLoading: State['foldersLoading']
    user: State['user']
    locale: State['settings']['locale']
    texts: State['texts'][Locales]
  } = useStoreState(state => ({
    folders: state.folders,
    foldersLoading: state.foldersLoading,
    user: state.user,
    texts: state.texts[state.settings.locale].storage
  }))

  const folders = useMemo(() => [{
    id: user?.id,
    title: texts.generalFolderTitle,
    category: ''
  }, ...loadedFolders],
  [loadedFolders])

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

export const useFolder = (id = 0) => {
  const { folderContent }: {
    folderContent: State['folderContent'][0]
  } = useStoreState(state => ({
    folderContent: state.folderContent[id],
  }))
  const { folders } = useFolders()
  const folder = folders.find(folder => folder.id === id) as Folders[0]

  return useMemo(() => ({
    folder: {
      ...folder,
      ...folderContent
    }
  }), [folder, folderContent])
}

export const useActiveFolder = () => {
  const {
    activeFolderId
  }: {
    activeFolderId: State['activeFolderId']
  } = useStoreState(state => ({
    activeFolderId: state.activeFolderId
  }))
  const { folder } = useFolder(activeFolderId)

  return useMemo(() => ({
    folder
  }), [folder])
}
