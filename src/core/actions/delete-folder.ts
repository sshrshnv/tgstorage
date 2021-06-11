import type { Folder } from '~/core/store'
import { api } from '~/api'

import { waitFolders } from './wait-folders'
import { setUpdates } from './set-updates'

export const deleteFolder = async (
  folder: Folder
) => {
  waitFolders(true)
  const updates = await api.deleteFolder(folder)

  setUpdates(updates)
  return true
}
