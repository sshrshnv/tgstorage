import 'core-js'

import type { FunctionComponent as FC } from 'preact'
import { h, render, Fragment } from 'preact'
import { Provider } from 'unistore-hooks'

import { listenAppErrors, listenAppInstall } from '~/core/actions'
listenAppErrors()
listenAppInstall()

import { store } from '~/core/store'
import { useAppRoute, useUser } from '~/core/hooks'
import { checkIsIOSSafari } from '~/tools/detect-device'
import { registerSW } from '~/sw'
import { IntroLazy } from '~/features/intro'
import { AuthLazy } from '~/features/auth'
import { StorageLazy } from '~/features/storage'
import { WidgetsLazy } from '~/widgets'
import { IOSInstallPromptLazy } from '~/ui/elements/ios-install-prompt'
import {
  PreventContextMenu, PreventScale, PreventDragAndDrop,
  ApplyTheme, ApplyLocale
} from '~/ui/handlers'

const App: FC = () => {
  const { isIntroAppRoute } = useAppRoute()
  const { user } = useUser()

  return (
    <Fragment>
      {isIntroAppRoute ? (
        <IntroLazy/>
      ) : user ? (
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

render(
  <Provider value={store}>
    <App/>
  </Provider>,
  document.body
)
