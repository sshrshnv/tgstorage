import { store } from '~/core/store'

export const getLocale = () =>
  store.getState().settings.locale
