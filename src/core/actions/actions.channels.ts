import { api } from '~/api'
import { timer } from '~/tools/timer'

export const joinAnnouncementsChannel = async ({ timeout } = { timeout: false }) => {
  if (timeout) {
    await timer(30 * 1000)
  }
  api.joinAnnouncementsChannel()
}
