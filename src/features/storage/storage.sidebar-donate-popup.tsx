import { FunctionComponent as FC } from 'preact'
import { h } from 'preact'
import { memo } from 'preact/compat'
import { useCallback, useState, useEffect } from 'preact/hooks'

import { useTexts } from '~/core/hooks'
import { checkIsDesktop } from '~/tools/detect-device'
import { shareText, checkIsSharingSupported } from '~/tools/share-data'
import { COPY_TIMEOUT, copyText } from '~/tools/copy-text'
import { SidebarPopup } from '~/ui/elements/sidebar-popup'
import { QRCodeLazy } from '~/ui/elements/qrcode'
import { Form } from '~/ui/elements/form'
import { Link } from '~/ui/elements/link'
import { Button } from '~/ui/elements/button'
import { Text } from '~/ui/elements/text'
import { Break } from '~/ui/elements/break'

type Props = {
  onClose: () => void
}

const APP_LINK = `https://${process.env.DOMAIN}`

export const StorageSidebarDonatePopup: FC<Props> = memo(({
  onClose
}) => {
  const { texts } = useTexts('storage')
  const [coping, setCoping] = useState(false)

  const handleDonate = useCallback(() => {
    (self as any).gtag?.('event', 'donate_click')
  }, [])

  const handleCopy = useCallback(async () => {
    setCoping(true)
    copyText(APP_LINK)
    setTimeout(() => {
      setCoping(false)
    }, COPY_TIMEOUT)
  }, [setCoping])

  const handleShare = useCallback(() => {
    shareText(APP_LINK)
  }, [])

  useEffect(() => {
    (self as any).gtag?.('event', 'donate_view')
  }, [])

  return process.env.DONATE_LINK ? (
    <SidebarPopup
      title={texts.donateTitle}
      onClose={onClose}
    >
      <Form center>
        <Break size={28} px/>

        <QRCodeLazy
          link={process.env.DONATE_LINK}
        />
        <Break size={28} px/>

        <Text center>
          {texts.donateDescription}
        </Text>
        <Break size={28} px/>

        <Link
          href={process.env.DONATE_LINK}
          uppercase
          brand
          outline
          onClick={handleDonate}
        >
          {texts.donateButton}
        </Link>
        <Break size={28} px/>

        {!checkIsDesktop() && checkIsSharingSupported() ? (
          <Button
            type="button"
            onClick={handleShare}
            inline
          >
            {texts.linkShareTitle}
          </Button>
        ) : (
          <Button
            type="button"
            onClick={handleCopy}
            inline
          >
            {coping ? texts.linkCopiedTitle : texts.linkCopyTitle}
          </Button>
        )}
        <Break size={28} px/>
      </Form>
    </SidebarPopup>
  ) : null
})
