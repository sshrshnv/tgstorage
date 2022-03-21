import { store } from '~/core/store'
import { api } from '~/api'
import { timer } from '~/tools/timer'

export const checkNewsChannelJoining = async ({ timeout } = { timeout: false }) => {
  if (timeout) {
    await timer(30 * 1000)
  }
  const { joiningAvailable, joined } = await api.checkNewsChannelJoining()

  if (joiningAvailable && !joined) {
    store.setState({
      newsChannelAvailable: true
    })
  }
}

export const cancelNewsChannelJoining = () => {
  store.setState({
    newsChannelAvailable: false
  })
}

export const joinNewsChannel = async ({ timeout } = { timeout: false }) => {
  if (timeout) {
    await timer(30 * 1000)
  }
  api.joinNewsChannel()
}
