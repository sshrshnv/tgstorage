import 'core-js'

import type { FunctionComponent as FC } from 'preact'
import { h, render, Fragment } from 'preact'
import { Provider } from 'unistore-hooks'

import { registerSW } from '~/sw'
import { AuthLazy } from '~/features/auth'
import { StorageLazy } from '~/features/storage'
import {
  ApplyTheme, ApplyLocale,
  PreventContextMenu, PreventScale, PreventDragAndDrop
} from '~/ui/handlers'
import '~/ui/styles/global.styl'

import { store } from './store'
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
      <ApplyTheme/>
      <ApplyLocale/>
      <PreventContextMenu/>
      <PreventScale/>
      <PreventDragAndDrop/>
    </Fragment>
  )
}

render(
  <Provider value={store}>
    <App/>
  </Provider>,
  document.body
)

registerSW()
