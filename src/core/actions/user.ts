import type { User } from '~/core/store'
import { store, resetStore } from '~/core/store'
import { resetFiles } from '~/core/cache'
import { api } from '~/api'

export const getUser = () =>
  store.getState().user

export const setUser = (
  user: User
) => {
  store.setState({
    user,
    userLoading: false
  })
}

export const logOut = async () => {
  await api.logOut()
  resetStore()
  resetFiles()
}
