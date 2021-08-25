import type { FunctionComponent as FC } from 'preact'
import { h, Fragment } from 'preact'
import { memo } from 'preact/compat'
import { useState } from 'preact/hooks'

import { useUser } from '~/core/hooks'

import { WidgetsAppUpdate } from './widgets.app-update'
import { WidgetsAppInstall } from './widgets.app-install'
import { WidgetsAppError } from './widgets.app-error'

const Widgets: FC = memo(() => {
  const { user } = useUser()
  const [errorVisible, setErrorVisible] = useState(false)
  const [updateVisible, setUpdateVisible] = useState(false)
  const [installVisible, setInstallVisible] = useState(false)

  return (
    <Fragment>
      {errorVisible ? (
        <WidgetsAppError
          setVisible={setErrorVisible}
        />
      ) : updateVisible ? (
        <WidgetsAppUpdate
          setVisible={setUpdateVisible}
        />
      ) : (installVisible && !!user) ? (
        <WidgetsAppInstall
          setVisible={setInstallVisible}
        />
      ) : null}
    </Fragment>
  )
})

export default Widgets
