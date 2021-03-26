import { api } from '~/api'

import { store, storeWorker } from './store'

export const setTexts = (texts) => {
  store.setState({
    texts: {
      ...store.getState().texts,
      ...texts
    }
  })
}

export const setUser = (user) => {
  store.setState({
    user,
    userLoading: false
  })
  storeWorker.persistUser(user)
}

export const setFolders = (folders) => {
  store.setState({
    folders,
    foldersLoading: false
  })
  storeWorker.persistUser(folders)
}

export const loadUser = async () => {
  const user = await api.getUser()
    .catch(({ error_code }) => {
      if (error_code === 401) {
        //logOut()
      }
      return null
    })
  setUser(user)
}

export const logOut = async () => {
  await api.logOut()
  setUser(null)
}

export const loadFolders = async () => {
  const folders = await api.getFolders()
    .catch(({ error_code }) => {
      if (error_code === 401) {
        logOut()
      }
      return []
    })
  setFolders(folders)
}
