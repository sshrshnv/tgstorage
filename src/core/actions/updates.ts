import type { Updates } from '~/api'

import { setFolders } from './folders'
import { setFoldersMessages } from './messages'

export const setUpdates = ({
  folders,
  foldersMessages
}: Updates) => {
  if (folders) {
    setFolders(folders)
  }
  if (foldersMessages) {
    setFoldersMessages(foldersMessages)
  }
}
