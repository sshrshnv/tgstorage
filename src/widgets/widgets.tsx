import type { FunctionComponent as FC } from 'preact'
import { h, Fragment } from 'preact'
import { memo } from 'preact/compat'
import { useState } from 'preact/hooks'

import {
  useUser, useSettings, useAppRoute,
  useAppError, useAppUpdate, useAppInstall
} from '~/core/hooks'

import { WidgetsAppUpdate } from './widgets.app-update'
import { WidgetsAppInstall } from './widgets.app-install'
import { WidgetsAppError } from './widgets.app-error'

const Widgets: FC = memo(() => {
  const { user } = useUser()
  const { errorWidgetEnabled, installWidgetEnabled } = useSettings()
  const { isIntroAppRoute } = useAppRoute()
  const { appErrorExists } = useAppError()
  const { appUpdateExists } = useAppUpdate()
  const { appInstallAvailable, appInstalled } = useAppInstall()
  const [errorVisible, setErrorVisible] = useState(errorWidgetEnabled && appErrorExists)
  const [updateVisible, setUpdateVisible] = useState(appUpdateExists)
  const [installVisible, setInstallVisible] = useState(installWidgetEnabled && appInstallAvailable && !appInstalled)

  return (
    <Fragment>
      {errorWidgetEnabled && (
        <WidgetsAppError
          setVisible={setErrorVisible}
          popup={isIntroAppRoute || !user}
          visible={errorVisible}
        />
      )}
      <WidgetsAppUpdate
        setVisible={setUpdateVisible}
        popup={isIntroAppRoute || !user}
        visible={updateVisible && !errorVisible}
      />
      {installWidgetEnabled && (
        <WidgetsAppInstall
          setVisible={setInstallVisible}
          visible={installVisible && !errorVisible && !updateVisible && !isIntroAppRoute && !!user}
        />
      )}
    </Fragment>
  )
})

export default Widgets
