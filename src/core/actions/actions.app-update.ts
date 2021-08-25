import { store } from '~/core/store'

export const setAppUpdateExists = () => {
  store.setState({
    appUpdateExists: true
  })
}

export const setAppUpdateAccepted = () => {
  store.setState({
    appUpdateAccepted: true
  })
}

export const waitAppUpdateAccepted = (
  cb: () => void
) => {
  const unsubscribe = store.subscribe(state => {
    if (state.appUpdateAccepted) {
      unsubscribe()
      cb()
    }
  })
}
