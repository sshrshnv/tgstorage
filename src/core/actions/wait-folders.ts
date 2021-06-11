import { store } from '~/core/store'

export const waitFolders = (
  foldersLoading: boolean
) => {
  store.setState({
    foldersLoading
  })
}
