import type { FunctionComponent as FC } from 'preact'
import type { StateUpdater } from 'preact/hooks'
import { h } from 'preact'
import { memo } from 'preact/compat'
import { useCallback, useEffect, useState } from 'preact/hooks'

import { setAppUpdateAccepted } from '~/core/actions'
import { useTexts, useAppUpdate } from '~/core/hooks'
import { Widget } from '~/ui/elements/widget'

type Props = {
  setVisible: StateUpdater<boolean>
}

export const WidgetsAppUpdate: FC<Props> = memo(({
  setVisible
}) => {
  const { texts } = useTexts('widgets')
  const { appUpdateExists } = useAppUpdate()
  const [loading, setLoading] = useState(false)

  const handleClick = useCallback(() => {
    setLoading(true)
    setAppUpdateAccepted()
  }, [setLoading])

  useEffect(() => {
    if (!appUpdateExists) return
    setVisible(true)
  }, [appUpdateExists, setVisible])

  return (
    <Widget
      title={texts.updateTitle}
      description={texts.updateDescription}
      button={texts.updateButton}
      loading={loading}
      onClick={handleClick}
    />
  )
})
