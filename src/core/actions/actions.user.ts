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

let photoLoading = false
export const loadPhoto = async () => {
  const user = getUser()
  if (!user?.photo || user.photoFile || photoLoading) return

  photoLoading = true
  const photoFile = await api.downloadPhotoFile(user.photo)

  setUser({
    ...user,
    photoFile
  })
  photoLoading = false
}

let logouting = false
export const logOut = async () => {
  if (logouting) return
  logouting = true

  await api.logOut()
  resetStore()
  resetFiles()

  logouting = false
}

export const updateUser = async () => {
  const { user } = await api.updateUser()
  store.setState({
    user
  })
}
