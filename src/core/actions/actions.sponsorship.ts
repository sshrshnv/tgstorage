import { store } from '~/core/store'
import { api } from '~/api'
import { timer } from '~/tools/timer'

export const checkSponsorshipJoining = async ({ timeout } = { timeout: false }) => {
  if (timeout) {
    await timer(30 * 1000)
  }
  const { joiningAvailable, joined } = await api.checkSponsorshipJoining()

  if (joiningAvailable && !joined) {
    store.setState({
      sponsorshipAvailable: true
    })
  }
}

export const cancelSponsorshipJoining = () => {
  store.setState({
    sponsorshipAvailable: false
  })
}
