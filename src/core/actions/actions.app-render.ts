import { store } from '~/core/store'
import { timer } from '~/tools/timer'

export const setAppFeatureRendered = async () => {
  if (store.getState().appFeatureRendered) return

  await timer(1000)

  store.setState({
    appFeatureRendered: true
  })
}
