import 'core-js'

import { h, render, Fragment } from 'preact'
import type { FunctionComponent as FC } from 'preact'
import { useEffect } from 'preact/hooks'
import { Provider } from 'unistore-hooks'

import { AuthLazy } from '~/features/auth'
import { StorageLazy } from '~/features/storage'
import { PreventContextMenu, PreventScale, PreventDragAndDrop } from '~/ui/tools'
import '~/ui/styles/global.styl'

import { store } from './store'
import { handleUpdates } from './updates'
import { useUser } from './hooks'

const App: FC = () => {
  const { user } = useUser()

  return (
    <Fragment>
      {user ? (
        <StorageLazy/>
      ) : (
        <AuthLazy/>
      )}
      <PreventContextMenu/>
      <PreventScale/>
      <PreventDragAndDrop/>
    </Fragment>
  )
}

//handleUpdates()
render(
  <Provider value={store}>
    <App/>
  </Provider>,
  document.body
)
