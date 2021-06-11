import { store } from '~/core/store'

export const setUser = (
  user: User
) => {
  store.setState({
    user,
    userLoading: false
  })
}
