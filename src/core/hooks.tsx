import { useMemo } from 'preact/hooks'
import { useStoreState } from 'unistore-hooks'

import type { State } from './store'

export const useTexts = (feature?: 'auth'|'storage') => {
  const { texts } = useStoreState(state => ({
    texts: feature ? state.texts[feature] : state.texts
  }))

  return useMemo(() => ({
    texts
  }), [feature])
}

export const useUser = () => {
  const { user, userLoading }: Partial<State> = useStoreState(state => ({
    user: state.user,
    userLoading: state.userLoading
  }))

  return useMemo(() => ({
    user,
    userLoading
  }), [user?.id, userLoading])
}

export const useFolders = () => {
  const { folders, foldersLoading }: Partial<State> = useStoreState(state => ({
    folders: state.folders,
    foldersLoading: state.foldersLoading
  }))

  return useMemo(() => ({
    folders,
    foldersLoading
  }), [folders, foldersLoading])
}

export const useFolder = () => {
  return useMemo(() => ({

  }), [])
}
