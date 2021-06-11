import { store } from '~/core/store'

export const setActiveFolder = (
  id: number
) => {
  store.setState({
    activeFolderId: id
  })
}
