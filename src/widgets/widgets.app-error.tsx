import type { FunctionComponent as FC } from 'preact'
import type { StateUpdater } from 'preact/hooks'
import { h } from 'preact'
import { memo } from 'preact/compat'
import { useCallback, useEffect } from 'preact/hooks'

import { setAppErrorExists } from '~/core/actions'
import { useTexts, useAppError } from '~/core/hooks'
import { Widget } from '~/ui/elements/widget'

type Props = {
  setVisible: StateUpdater<boolean>
}

export const WidgetsAppError: FC<Props> = memo(({
  setVisible
}) => {
  const { texts } = useTexts('widgets')
  const { appErrorExists } = useAppError()

  const handleClose = useCallback(() => {
    setAppErrorExists(false)
    setVisible(false)
  }, [setVisible])

  useEffect(() => {
    if (!appErrorExists) return
    setVisible(true)
  }, [appErrorExists, setVisible])

  return (
    <Widget
      title={texts.errorTitle}
      description={texts.errorDescription}
      button={texts.errorButton}
      error
      onClose={handleClose}
    />
  )
})
