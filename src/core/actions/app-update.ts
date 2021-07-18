import { store } from '~/core/store'

export const setAppUpdateExist = () => {
  store.setState({
    appUpdateExist: true
  })
}

export const setAppUpdateAccepted = () => {
  store.setState({
    appUpdateAccepted: true
  })
}

export const waitAppUpdateAccepted = (cb) => {
  const unsubscribe = store.subscribe(state => {
    if (state.appUpdateAccepted) {
      unsubscribe()
      cb()
    }
  })
}
