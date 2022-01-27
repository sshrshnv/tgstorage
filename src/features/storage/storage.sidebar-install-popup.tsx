import type { FunctionComponent as FC } from 'preact'
import { Fragment, h } from 'preact'
import { memo } from 'preact/compat'

import { installApp } from '~/core/actions'
import { useTexts, useAppInstall } from '~/core/hooks'
import { SidebarPopup } from '~/ui/elements/sidebar-popup'
import { Form } from '~/ui/elements/form'
import { Text } from '~/ui/elements/text'
import { Button } from '~/ui/elements/button'
import { Break } from '~/ui/elements/break'

type Props = {
  onClose: () => void
}

export const StorageSidebarInstallPopup: FC<Props> = memo(({
  onClose
}) => {
  const { texts } = useTexts('storage')
  const { appInstallAvailable } = useAppInstall()

  return (
    <SidebarPopup
      title={texts.installTitle}
      onClose={onClose}
    >
      <Form center>
        <Break size={24} px/>

        <Text medium center>
          {texts.installDescription}
        </Text>
        <Break size={16} px/>

        <Text medium withLink center>
          {texts.installBrowsers}
          <Break size={16} px/>

          Android
          <Break size={4} px/>
          <a
            href="market://details?id=com.android.chrome"
            target="_top"
            rel="noopener noreferrer"
          >Google Chrome</a>
          <Break size={16} px/>

          iPhone
          <Break size={4} px/>
          <a
            href="https://www.apple.com/safari"
            target="_blank"
            rel="noopener noreferrer"
          >Safari</a>
          <Break size={16} px/>

          Mac
          <Break size={4} px/>
          <a
            href="https://www.google.com/chrome"
            target="_blank"
            rel="noopener noreferrer"
          >Google Chrome</a>
          <Break size={16} px/>

          Windows
          <Break size={4} px/>
          <a
            href="https://www.microsoft.com/edge"
            target="_blank"
            rel="noopener noreferrer"
          >Microsoft Edge</a>
          <Break size={4} px/>
          <a
            href="https://www.google.com/chrome"
            target="_blank"
            rel="noopener noreferrer"
          >Google Chrome</a>
          <Break size={16} px/>

          {appInstallAvailable ? (
            <Fragment>
              <Break size={16} px/>
              <Button
                uppercase
                brand
                outline
                onClick={installApp}
              >
                {texts.installButton}
              </Button>
            </Fragment>
          ) : (
            <Text grey center>
              {texts.installHelp}
            </Text>
          )}
          <Break size={28} px/>
        </Text>
      </Form>
    </SidebarPopup>
  )
})
