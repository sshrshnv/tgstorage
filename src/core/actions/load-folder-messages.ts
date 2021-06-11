import type { Folder } from '~/core/store'
import { api } from '~/api'

import { setLoadingFolderId } from './set-loading-folder-id'
import { setUpdates } from './set-updates'

export const loadFolderMessages = async (
  folder: Folder,
  offsetId?: number
) => {
  setLoadingFolderId(folder.id, true)
  const updates = await api.getMessages(folder, offsetId)

  if (!updates) {
    setLoadingFolderId(folder.id, false)
    return false
  }

  setUpdates(updates)
  setLoadingFolderId(folder.id, false)
  return true
}
