import type { FunctionComponent as FC } from 'preact'
import type { StateUpdater } from 'preact/hooks'
import { h } from 'preact'
import { memo } from 'preact/compat'
import { useCallback, useEffect, useMemo } from 'preact/hooks'

import { cancelNewsChannelJoining } from '~/core/actions'
import { useTexts, useUser, useNewsChannel } from '~/core/hooks'
import { getNewsChannelInviteLink } from '~/tools/handle-channels'
import { Widget } from '~/ui/elements/widget'

type Props = {
  visible: boolean
  setVisible: StateUpdater<boolean>
}

export const WidgetsNewsChannel: FC<Props> = memo(({
  visible,
  setVisible
}) => {
  const { texts } = useTexts('widgets')
  const { user } = useUser()
  const { newsChannelAvailable } = useNewsChannel()

  const link = useMemo(() => {
    return user?.country ? getNewsChannelInviteLink(user.country) : ''
  }, [user?.country])

  const handleClose = useCallback(() => {
    setVisible(false)
    cancelNewsChannelJoining()
  }, [setVisible])

  useEffect(() => {
    if (!newsChannelAvailable) return
    setVisible(true)
  }, [newsChannelAvailable, setVisible])

  return (visible && link) ? (
    <Widget
      title={texts.newsChannelTitle}
      description={texts.newsChannelDescription}
      button={texts.newsChannelButton}
      link={link}
      onClick={handleClose}
      onClose={handleClose}
    />
  ) : null
})
