import type { User } from '~/core/store'
import { store } from '~/core/store'
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
}
