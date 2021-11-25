import { store } from '~/core/store'
import { api } from '~/api'
import { timer } from '~/tools/timer'

export const checkAnncChannelJoining = async ({ timeout } = { timeout: false }) => {
  if (timeout) {
    await timer(30 * 1000)
  }
  const { joiningAvailable, joined } = await api.checkAnncChannelJoining()

  if (joiningAvailable && !joined) {
    store.setState({
      anncChannelAvailable: true
    })
  }
}

export const cancelAnncChannelJoining = () => {
  store.setState({
    anncChannelAvailable: false
  })
}

export const joinAnncChannel = async ({ timeout } = { timeout: false }) => {
  if (timeout) {
    await timer(30 * 1000)
  }
  api.joinAnncChannel()
}
