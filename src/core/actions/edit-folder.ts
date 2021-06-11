import type { Folder } from '~/core/store'
import { api } from '~/api'

import { waitFolders } from './wait-folders'
import { setUpdates } from './set-updates'

export const editFolder = async (
  name: string,
  folder: Folder
) => {
  waitFolders(true)
  const updates = await api.editFolder(name, folder)

  setUpdates(updates)
  return true
}
