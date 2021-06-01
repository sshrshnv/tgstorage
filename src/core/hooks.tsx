import { useMemo } from 'preact/hooks'
import { useStoreState } from 'unistore-hooks'

import type { State, Locales, Folder, Message } from './store'

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

export const useFolder = (id = 0) => {
  const {
    folders,
    foldersMessages,
    texts
  }: {
    folders: State['folders']
    foldersMessages: State['foldersMessages']
    texts: State['texts'][Locales]
  } = useStoreState(state => ({
    folders: state.folders,
    foldersMessages: state.foldersMessages,
    texts: state.texts[state.settings.locale].storage
  }))

  const folder = folders.get(id) as Folder
  const folderMessages = foldersMessages.get(id)

  return useMemo(() => ({
    folder: {
      ...folder,
      title: folder?.general ? texts.generalFolderTitle : folder?.title
    },
    messages: [...(folderMessages || new Map()).values()] as Message[]
  }), [folder, folderMessages])
}

export const useActiveFolder = () => {
  const {
    activeFolderId,
    loadingFolderIds
  }: {
    activeFolderId: State['activeFolderId']
    loadingFolderIds: State['loadingFolderIds']
  } = useStoreState(state => ({
    activeFolderId: state.activeFolderId,
    loadingFolderIds: state.loadingFolderIds
  }))
  const { folder, messages } = useFolder(activeFolderId)
  const messagesLoading = useMemo(() => {
    return loadingFolderIds.get(activeFolderId) || false
  }, [activeFolderId, loadingFolderIds])

  return useMemo(() => ({
    folder,
    messages,
    messagesLoading
  }), [folder, messages, messagesLoading])
}
