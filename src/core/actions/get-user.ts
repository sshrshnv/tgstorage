import { store } from '~/core/store'

export const getUser = () =>
  store.getState().user
