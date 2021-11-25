import type { FunctionComponent as FC } from 'preact'
import type { StateUpdater } from 'preact/hooks'
import { h } from 'preact'
import { memo } from 'preact/compat'
import { useCallback, useEffect, useMemo } from 'preact/hooks'

import { cancelAnncChannelJoining } from '~/core/actions'
import { useTexts, useUser, useAnncChannel } from '~/core/hooks'
import { getAnncChannelInviteLink } from '~/tools/handle-channels'
import { Widget } from '~/ui/elements/widget'

type Props = {
  visible: boolean
  setVisible: StateUpdater<boolean>
}

export const WidgetsAnncChannel: FC<Props> = memo(({
  visible,
  setVisible
}) => {
  const { texts } = useTexts('widgets')
  const { user } = useUser()
  const { anncChannelAvailable } = useAnncChannel()

  const link = useMemo(() => {
    return user?.country ? getAnncChannelInviteLink(user.country) : ''
  }, [user?.country])

  const handleClose = useCallback(() => {
    setVisible(false)
    cancelAnncChannelJoining()
  }, [setVisible])

  useEffect(() => {
    if (!anncChannelAvailable) return
    setVisible(true)
  }, [anncChannelAvailable, setVisible])

  return (visible && link) ? (
    <Widget
      title={texts.anncChannelTitle}
      description={texts.anncChannelDescription}
      button={texts.anncChannelButton}
      link={link}
      onClick={handleClose}
      onClose={handleClose}
    />
  ) : null
})
