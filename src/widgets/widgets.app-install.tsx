import type { FunctionComponent as FC } from 'preact'
import type { StateUpdater } from 'preact/hooks'
import { h } from 'preact'
import { memo } from 'preact/compat'
import { useCallback, useEffect } from 'preact/hooks'
import { useStoreState } from 'unistore-hooks'

import type { State } from '~/core/store'
import { installApp } from '~/core/actions'
import { useTexts } from '~/core/hooks'
import { Widget } from '~/ui/elements/widget'

type Props = {
  setVisible: StateUpdater<boolean>
}

export const WidgetsAppInstall: FC<Props> = memo(({
  setVisible
}) => {
  const { texts } = useTexts('widgets')
  const {
    appInstallAvailable
  }: {
    appInstallAvailable: State['appInstallAvailable']
  } = useStoreState(state => ({
    appInstallAvailable: state.appInstallAvailable
  }))

  const handleClick = useCallback(() => {
    installApp()
  }, [setVisible])

  const handleClose = useCallback(() => {
    setVisible(false)
  }, [setVisible])

  useEffect(() => {
    if (!appInstallAvailable) return
    setVisible(true)
  }, [appInstallAvailable, setVisible])

  return (
    <Widget
      title={texts.installTitle}
      description={texts.installDescription}
      button={texts.installButton}
      onClick={handleClick}
      onClose={handleClose}
    />
  )
})
