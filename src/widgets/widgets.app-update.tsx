import type { FunctionComponent as FC } from 'preact'
import type { StateUpdater } from 'preact/hooks'
import { h } from 'preact'
import { memo } from 'preact/compat'
import { useCallback, useEffect, useState, useMemo } from 'preact/hooks'

import { setAppUpdateAccepted } from '~/core/actions'
import { useTexts, useAppUpdate } from '~/core/hooks'
import { getNewsChannelInviteLink } from '~/tools/handle-channels'
import { Widget } from '~/ui/elements/widget'

type Props = {
  popup: boolean
  visible: boolean
  setVisible: StateUpdater<boolean>
}

export const WidgetsAppUpdate: FC<Props> = memo(({
  popup,
  visible,
  setVisible
}) => {
  const { texts } = useTexts('widgets')
  const { appUpdateExists } = useAppUpdate()
  const [loading, setLoading] = useState(false)

  const link = useMemo(() => {
    return getNewsChannelInviteLink()
  }, [])

  const handleClick = useCallback(() => {
    setLoading(true)
    setAppUpdateAccepted()
  }, [setLoading])

  useEffect(() => {
    if (!appUpdateExists) return
    setVisible(true)
  }, [appUpdateExists, setVisible])

  return visible ? (
    <Widget
      title={texts.update.title}
      description={texts.update.description}
      descriptionAddition={texts.update.descriptionLink}
      descriptionLink={link}
      button={texts.update.button}
      loading={loading}
      popup={popup}
      onClick={handleClick}
    />
  ) : null
})
