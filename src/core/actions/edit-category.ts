import { api } from '~/api'

import { waitFolders } from './wait-folders'
import { setUpdates } from './set-updates'

export const editCategory = async (
  newCategory: string,
  category: string
) => {
  waitFolders(true)
  const updates = await api.editCategory(newCategory, category)

  setUpdates(updates)
  return true
}
