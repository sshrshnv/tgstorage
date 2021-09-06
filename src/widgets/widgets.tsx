import type { FunctionComponent as FC } from 'preact'
import { h, Fragment } from 'preact'
import { memo } from 'preact/compat'
import { useState } from 'preact/hooks'

import { useUser, useAppRoute, useAppError, useAppUpdate, useAppInstall } from '~/core/hooks'

import { WidgetsAppUpdate } from './widgets.app-update'
import { WidgetsAppInstall } from './widgets.app-install'
import { WidgetsAppError } from './widgets.app-error'

const Widgets: FC = memo(() => {
  const { user } = useUser()
  const { isIntroAppRoute } = useAppRoute()
  const { appErrorExists } = useAppError()
  const { appUpdateExists } = useAppUpdate()
  const { appInstallAvailable, appInstalled } = useAppInstall()
  const [errorVisible, setErrorVisible] = useState(appErrorExists)
  const [updateVisible, setUpdateVisible] = useState(appUpdateExists)
  const [installVisible, setInstallVisible] = useState(appInstallAvailable && !appInstalled)

  return (
    <Fragment>
      {errorVisible ? (
        <WidgetsAppError
          setVisible={setErrorVisible}
          popup={isIntroAppRoute || !user}
        />
      ) : updateVisible ? (
        <WidgetsAppUpdate
          setVisible={setUpdateVisible}
          popup={isIntroAppRoute || !user}
        />
      ) : (installVisible && !isIntroAppRoute && !!user) ? (
        <WidgetsAppInstall
          setVisible={setInstallVisible}
        />
      ) : null}
    </Fragment>
  )
})

export default Widgets
