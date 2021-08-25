import 'core-js'

import type { FunctionComponent as FC } from 'preact'
import { h, render, Fragment } from 'preact'
import { Provider } from 'unistore-hooks'

import { listenAppError } from '~/core/actions'
listenAppError()

import { store } from '~/core/store'
import { useUser } from '~/core/hooks'
import { listenAppInstall } from '~/core/actions'
import { checkIsIOSSafari } from '~/tools/detect-device'
import { registerSW } from '~/sw'
import { initApi } from '~/api'
import { AuthLazy } from '~/features/auth'
import { StorageLazy } from '~/features/storage'
import { WidgetsLazy } from '~/widgets'
import { IOSInstallPromptLazy } from '~/ui/elements/ios-install-prompt'
import {
  PreventContextMenu, PreventScale, PreventDragAndDrop,
  ApplyTheme, ApplyLocale
} from '~/ui/handlers'
import '~/ui/styles/styles.global.styl'

const App: FC = () => {
  const { user } = useUser()

  return (
    <Fragment>
      {user ? (
        <StorageLazy/>
      ) : (
        <AuthLazy/>
      )}
      <WidgetsLazy/>

      <ApplyTheme/>
      <ApplyLocale/>

      <PreventContextMenu/>
      <PreventScale/>
      <PreventDragAndDrop/>

      {checkIsIOSSafari() && (
        <IOSInstallPromptLazy/>
      )}
    </Fragment>
  )
}

registerSW()
listenAppInstall()
await initApi()

render(
  <Provider value={store}>
    <App/>
  </Provider>,
  document.body
)
