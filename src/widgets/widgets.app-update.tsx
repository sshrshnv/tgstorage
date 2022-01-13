import type { FunctionComponent as FC } from 'preact'
import type { StateUpdater } from 'preact/hooks'
import { h } from 'preact'
import { memo } from 'preact/compat'
import { useCallback, useEffect, useState, useMemo } from 'preact/hooks'

import { setAppUpdateAccepted } from '~/core/actions'
import { useTexts, useUser, useAppUpdate } from '~/core/hooks'
import { getAnncChannelInviteLink } from '~/tools/handle-channels'
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
  const { user } = useUser()
  const { appUpdateExists } = useAppUpdate()
  const [loading, setLoading] = useState(false)

  const link = useMemo(() => {
    return user?.country ? getAnncChannelInviteLink(user.country) : ''
  }, [user?.country])

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
      title={texts.updateTitle}
      description={texts.updateDescription}
      descriptionAddition={texts.updateDescriptionLink}
      descriptionLink={link}
      button={texts.updateButton}
      loading={loading}
      popup={popup}
      onClick={handleClick}
    />
  ) : null
})
