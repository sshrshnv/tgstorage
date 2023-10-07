import 'core-js'

import type { FunctionComponent as FC } from 'preact'
import { h, render, Fragment } from 'preact'
import { memo } from 'preact/compat'
import { useEffect } from 'preact/hooks'
import { Provider } from 'unistore-hooks'

import { listenAppErrors, listenAppInstall } from '~/core/actions'
listenAppErrors()
listenAppInstall()

import { resetFiles } from '~/core/cache'
resetFiles()

import { store } from '~/core/store'
import { updateUser, listenApiErrors } from '~/core/actions'
import { useAppRoute, useAppRender, useUser } from '~/core/hooks'
import { registerSW } from '~/sw'
import { IntroLazy } from '~/features/intro'
import { AuthLazy } from '~/features/auth'
import { StorageLazy } from '~/features/storage'
import { WidgetsLazy } from '~/widgets'
import { UIPreset, UIFallback } from '~/ui'
import { Analytics } from '~/scripts/analytics'

const App: FC = memo(() => {
  const { isIntroAppRoute } = useAppRoute()
  const { appFeatureRendered } = useAppRender()
  const { user, userRef, isLegacyUser } = useUser()

  useEffect(() => {
    if (!isLegacyUser) return
    listenApiErrors()
    updateUser()
  }, [isLegacyUser])

  return (
    <Fragment>
      {isIntroAppRoute ? (
        <IntroLazy/>
      ) : isLegacyUser ? (
        <UIFallback/>
      ) : user ? (
        <StorageLazy/>
      ) : (
        <AuthLazy/>
      )}
      <WidgetsLazy/>
      <UIPreset/>

      {appFeatureRendered && (
        <Analytics userRef={userRef}/>
      )}
    </Fragment>
  )
})

registerSW()

render(
  <Provider value={store}>
    <App/>
  </Provider>,
  document.body
)
