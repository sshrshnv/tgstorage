import type { FunctionComponent as FC } from 'preact'
import type { StateUpdater } from 'preact/hooks'
import { h } from 'preact'
import { memo } from 'preact/compat'
import { useCallback, useEffect, useMemo } from 'preact/hooks'

import { cancelSponsorshipJoining } from '~/core/actions'
import { useTexts, useUser, useSponsorship } from '~/core/hooks'
import { getSponsorshipBotLink } from '~/tools/handle-sponsorship'
import { Widget } from '~/ui/elements/widget'

type Props = {
  visible: boolean
  setVisible: StateUpdater<boolean>
}

export const WidgetsSponsorship: FC<Props> = memo(({
  visible,
  setVisible
}) => {
  const { texts } = useTexts('widgets')
  const { user } = useUser()
  const { sponsorshipAvailable } = useSponsorship()

  const link = useMemo(() => {
    return getSponsorshipBotLink(user?.country)
  }, [user?.country])

  const handleClose = useCallback(() => {
    setVisible(false)
    cancelSponsorshipJoining()
  }, [setVisible])

  useEffect(() => {
    if (!sponsorshipAvailable) return
    setVisible(true)
  }, [sponsorshipAvailable, setVisible])

  return (visible && link) ? (
    <Widget
      title={texts.sponsorship.title}
      description={texts.sponsorship.description}
      button={texts.sponsorship.button}
      link={link}
      onClick={handleClose}
      onClose={handleClose}
    />
  ) : null
})
