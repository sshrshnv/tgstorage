import type { FunctionComponent as FC } from 'preact'
import type { StateUpdater } from 'preact/hooks'
import { h } from 'preact'
import { memo } from 'preact/compat'
import { useCallback, useEffect } from 'preact/hooks'

import { installApp, cancelAppInstall } from '~/core/actions'
import { useTexts, useAppInstall } from '~/core/hooks'
import { Widget } from '~/ui/elements/widget'

type Props = {
  visible: boolean
  setVisible: StateUpdater<boolean>
}

export const WidgetsAppInstall: FC<Props> = memo(({
  visible,
  setVisible
}) => {
  const { texts } = useTexts('widgets')
  const { appInstallAvailable, appInstalled } = useAppInstall()

  const handleClick = useCallback(() => {
    installApp()
  }, [setVisible])

  const handleClose = useCallback(() => {
    setVisible(false)
    cancelAppInstall()
  }, [setVisible])

  useEffect(() => {
    if (!appInstallAvailable) return
    setVisible(true)
  }, [appInstallAvailable, setVisible])

  useEffect(() => {
    if (!appInstalled) return
    setVisible(false)
  }, [appInstalled, setVisible])

  return visible ? (
    <Widget
      title={texts.install.title}
      description={texts.install.description}
      button={texts.install.button}
      onClick={handleClick}
      onClose={handleClose}
    />
  ) : null
})
