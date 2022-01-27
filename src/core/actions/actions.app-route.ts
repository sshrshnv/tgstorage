import { store } from '~/core/store'

let listenerEnabled = false

export const setAppRoute = (route: string) => {
  self.history.pushState(history.state, document.title, route)

  store.setState({
    appRoute: route
  })

  if (!listenerEnabled) {
    listenerEnabled = true

    const handlePopState = () => {
      store.setState({
        appRoute: self.location.pathname
      })
    }

    self.addEventListener('popstate', handlePopState)
  }
}
