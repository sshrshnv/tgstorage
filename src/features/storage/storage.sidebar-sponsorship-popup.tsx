import type { FunctionComponent as FC } from 'preact'
import { Fragment, h } from 'preact'
import { useMemo } from 'preact/hooks'
import { memo } from 'preact/compat'

import { useTexts, useUser, useSponsorship } from '~/core/hooks'
import { getSponsorshipBotLink } from '~/tools/handle-sponsorship'
import { SidebarPopup } from '~/ui/elements/sidebar-popup'
import { Form } from '~/ui/elements/form'
import { Text } from '~/ui/elements/text'
import { Link } from '~/ui/elements/link'
import { Break } from '~/ui/elements/break'

type Props = {
  onClose: () => void
}

const REQUIRED_SPONSORS = +(process.env.SPONSORSHIP_REQUIRED || 1000)
const CURRENT_SPONSORS = +(process.env.SPONSORSHIP_CURRENT || 0)

export const StorageSidebarSponsorshipPopup: FC<Props> = memo(({
  onClose
}) => {
  const { texts } = useTexts('storage')
  const { user } = useUser()
  const { sponsorshipAvailable } = useSponsorship()

  const link = useMemo(() => {
    return getSponsorshipBotLink(user?.country) || ''
  }, [user?.country])

  return (
    <SidebarPopup
      title={texts.sponsorshipTitle}
      onClose={onClose}
    >
      <Form center>
        <Break size={24} px/>

        <Text medium center>
          {texts.sponsorshipDescription}
        </Text>
        <Break size={24} px/>

        <Text medium withLink>
          {texts.sponsorshipPlatforms}
        </Text>
        <Break size={16} px/>

        <Text medium withLink>
          {texts.sponsorshipSpaces}
        </Text>
        <Break size={16} px/>

        <Text medium withLink>
          {texts.sponsorshipViews}
        </Text>
        <Break size={16} px/>

        <Text medium withLink>
          {texts.sponsorshipPlayers}
        </Text>
        <Break size={16} px/>

        <Text medium withLink>
          {texts.sponsorshipFiles}
        </Text>
        <Break size={28} px/>

        {sponsorshipAvailable && (
          <Fragment>
            <Text medium center>
              {texts.sponsorshipPayment}
            </Text>
            <Break size={16} px/>
          </Fragment>
        )}

        <Text medium justify>
          {texts.sponsorshipProgressRequired} <span>{REQUIRED_SPONSORS}</span>
        </Text>
        <Break size={4} px/>

        <Text medium justify>
          {texts.sponsorshipProgressCurrent} <span>{CURRENT_SPONSORS}</span>
        </Text>
        <Break size={4} px/>

        <Text medium justify>
          {texts.sponsorshipProgressPercent} <span>{CURRENT_SPONSORS ? CURRENT_SPONSORS / REQUIRED_SPONSORS : 0}%</span>
        </Text>
        <Break size={16} px/>

        <Break size={16} px/>
        <Text medium withLink>
          {sponsorshipAvailable ? (
            <Link
              href={link}
              uppercase
              brand
              outline
            >
              {texts.sponsorshipButton}
            </Link>
          ) : (
            <Text center>
              {texts.sponsorshipSuccess}
            </Text>
          )}
          <Break size={28} px/>
        </Text>
      </Form>
    </SidebarPopup>
  )
})
