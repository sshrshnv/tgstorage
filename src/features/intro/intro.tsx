import type { FunctionComponent as FC } from 'preact'
import { h } from 'preact'
import { useCallback } from 'preact/hooks'

import { installApp, setAppRoute } from '~/core/actions'
import { useTexts, useSettings, useAppInstall } from '~/core/hooks'
import { Layout } from '~/ui/elements/layout'
import { LayoutBlock } from '~/ui/elements/layout-block'
import { Logo } from '~/ui/elements/logo'
import { Break } from '~/ui/elements/break'
import { Text } from '~/ui/elements/text'
import { PicturesGroup } from '~/ui/elements/pictures-group'
import { Picture } from '~/ui/elements/picture'
import { Button } from '~/ui/elements/button'

import { screens } from './screens'

const SCREEN_TYPES = ['avif', 'webp', 'png']

const Intro: FC = () => {
  const { texts } = useTexts('intro')
  const { locale } = useSettings()
  const { appInstallAvailable } = useAppInstall()

  const handleContinue = useCallback(() => {
    setAppRoute('/app')
  }, [])

  return (
    <Layout scroll center wide>
      <Break mSize={48} dSize={72} px/>

      <Logo/>
      <Break mSize={40} dSize={64} px/>

      <LayoutBlock narrow>
        <Text uppercase bold center>
          {texts.title}
        </Text>
      </LayoutBlock>
      <Break size={20} px/>

      <LayoutBlock narrow>
        <Text center>
          {texts.description}
        </Text>
      </LayoutBlock>
      <Break mSize={36} dSize={60} px/>

      <PicturesGroup>
        {['main', 'photos', 'shopping'].map(name => (
          <Picture
            key={name}
            sources={SCREEN_TYPES.map(type => ({
              type,
              src: screens[`${name}-${locale}.${type}`]
            }))}
          />
        ))}
      </PicturesGroup>
      <Break mSize={40} dSize={64} px/>

      <LayoutBlock group reverse>
        <Picture sources={SCREEN_TYPES.map(type => ({
          type,
          src: screens[`channel-${locale}.${type}`]
        }))}/>
        <div>
          <Text>{texts.faqDescription0}</Text>
          <Text>{texts.faqDescription1}</Text>
        </div>
      </LayoutBlock>
      <Break mSize={36} dSize={48} px/>

      <LayoutBlock group>
        <Picture sources={SCREEN_TYPES.map(type => ({
          type,
          src: screens[`install-${locale}.${type}`]
        }))}/>
        <div>
          <Text withLink>
            {texts.appDescription0} <a
              href="https://github.com/sh-a-v/tgstorage"
              target="_blank"
              rel="noopener noreferrer"
            >GitHub</a>.
          </Text>
          <Text>{texts.appDescription1}</Text>
          {appInstallAvailable && (
            <Button
              uppercase
              brand
              onClick={installApp}
            >
              {texts.installButton}
            </Button>
          )}
          <Button
            uppercase
            brand
            outline={appInstallAvailable}
            onClick={handleContinue}
          >
            {texts.continueButton}
          </Button>
        </div>
      </LayoutBlock>
      <Break mSize={48} dSize={72} px/>

      <LayoutBlock narrow>
        <Text center withLink>
          {texts.support} <a
            href="https://t.me/tgstorage_support"
            target="_blank"
            rel="noopener noreferrer"
          >TgStorage Support</a>.
        </Text>
      </LayoutBlock>

      <Break mSize={48} dSize={72} px/>
    </Layout>
  )
}

export default Intro
