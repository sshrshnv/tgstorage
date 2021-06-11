import type { FoldersMessages } from '~/core/store'
import { store } from '~/core/store'

export const setFoldersMessages = (
  foldersMessages: FoldersMessages
) => {
  store.setState({
    foldersMessages
  })
}
