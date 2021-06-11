import { store } from '~/core/store'

export const setLoadingFolderId = (
  id: number,
  value: boolean
) => {
  const loadingFolderIds = new Map(store.getState().loadingFolderIds)
  loadingFolderIds.set(id, value)
  store.setState({
    loadingFolderIds
  })
}
