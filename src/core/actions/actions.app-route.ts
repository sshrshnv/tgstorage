import { store } from '~/core/store'

export const setAppRoute = (route: string) => {
  history.pushState(history.state, document.title, route)

  store.setState({
    appRoute: route
  })
}
