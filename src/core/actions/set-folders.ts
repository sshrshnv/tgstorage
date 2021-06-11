import type { Folders } from '~/core/store'
import { store } from '~/core/store'

export const setFolders = (
  folders: Folders
) => {
  store.setState({
    folders,
    foldersLoading: false
  })
}
