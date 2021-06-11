import { api } from '~/api'

export const logOut = async () => {
  await api.logOut()
}
