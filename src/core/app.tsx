import 'core-js'
import 'regenerator-runtime/runtime'

import { h, render } from 'preact'
import type { FunctionComponent as FC } from 'preact'
import { useEffect } from 'preact/hooks'
import { Provider } from 'unistore-hooks'

import { AuthLazy } from '~/features/auth'
import { StorageLazy } from '~/features/storage'
import '~/ui/styles/global.styl'

import { store } from './store'
import { handleUpdates } from './updates'
import { loadUser } from './actions'
import { useUser } from './hooks'

const App: FC = () => {
  const { user } = useUser()

  useEffect(() => {
    loadUser()
  }, [])

  console.log(user)

  return <StorageLazy/>

  return user ? (
    <StorageLazy/>
  ) : (
    <AuthLazy/>
  )
}

//handleUpdates()
render(
  <Provider value={store}>
    <App/>
  </Provider>,
  document.body
)
