import { api } from '~/api'

import { waitFolders } from './wait-folders'
import { logOut } from './log-out'
import { setUpdates } from './set-updates'

export const loadFolders = async () => {
  waitFolders(true)

  const updates = await api.getFolders()
    .catch(({ code }) => {
      if (code === 401) {
        logOut()
      }
      return null
    })

  if (updates?.folders) {
    setUpdates(updates)
  } else {
    waitFolders(false)
  }
}
