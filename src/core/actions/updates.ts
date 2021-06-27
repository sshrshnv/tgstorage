import type { Updates } from '~/api'

import { setFolders } from './folders'
import { setFoldersMessages, setSearchMessages } from './messages'

export const setUpdates = ({
  folders,
  foldersMessages,
  searchMessages
}: Updates) => {
  if (folders) {
    setFolders(folders)
  }
  if (foldersMessages) {
    setFoldersMessages(foldersMessages)
  }
  if (searchMessages) {
    setSearchMessages(searchMessages)
  }
}
