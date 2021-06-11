import { api } from '~/api'

import { waitFolders } from './wait-folders'
import { setUpdates } from './set-updates'

export const createFolder = async (
  name: string
) => {
  waitFolders(true)
  const updates = await api.createFolder(name)

  setUpdates(updates)
  return true
}
