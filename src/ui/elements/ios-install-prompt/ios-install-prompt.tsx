import type { FunctionComponent as FC } from 'preact'
import { h } from 'preact'
import { memo } from 'preact/compat'
import { useMemo, useCallback, useEffect, useState } from 'preact/hooks'
import cn from 'classnames'

import { useSettings } from '~/core/hooks'
import { useCallbackRef } from '~/tools/hooks'
import { getIOSVersion } from '~/tools/detect-device'

import {
  SafariIcon, ShareIcon, ShareModernIcon,
  HomeScreenIcon, HomeScreenModernIcon
} from './icons'
import en from './ios-install-prompt.texts.en.json'
import es from './ios-install-prompt.texts.es.json'
import ru from './ios-install-prompt.texts.ru.json'
import styles from './ios-install-prompt.styl'

const IOSInstallPrompt: FC = memo(() => {
  const { locale } = useSettings()
  const [rendered, setRendered] = useState(false)
  const [visible, setVisible] = useState(false)

  const texts = useMemo(() => {
    const texts = { en, es, ru }
    return texts[locale]
  }, [locale])

  const isModern = useMemo(() => {
    return getIOSVersion() >= 13
  }, [])

  const [_handleInstall, handleInstallRef] = useCallbackRef(() => {
    (self.document.activeElement as HTMLElement)?.blur?.()
    setRendered(true)
    setTimeout(() => setVisible(true), 0)
  }, [])

  const handleCancel = useCallback(() => {
    setVisible(false)
    self.setTimeout(() => setRendered(false), 400)
  }, [setVisible])

  useEffect(() => {
    const handleInstall = () => handleInstallRef.current?.()
    self.document.addEventListener('install', handleInstall, { passive: true })
    return () => self.document.removeEventListener('install', handleInstall)
  }, [])

  return (
    <div class={cn(
      styles.wrapper,
      isModern && styles._modern,
      rendered && styles._rendered,
      visible && styles._visible
    )}>
      <div
        class={styles.overlay}
        aria-label="Close"
        role="button"
      />

      <div
        class={styles.root}
        aria-describedby="prompt-description"
        aria-labelledby="prompt-title"
        role="dialog"
      >
        <div class={styles.header}>
          <p
            class={styles.title}
            id="prompt-title"
          >
            {texts.title}
          </p>
          <button
            class={styles.cancel}
            onClick={handleCancel}
          >
            {texts.cancel}
          </button>
        </div>

        <div class={styles.instruction}>
          <div class={styles.instructionStep}>
            <SafariIcon class={styles.safariIcon}/>
            <p class={cn(
              styles.text,
              styles._bold
            )}>
              {texts.safariStep}
            </p>
          </div>

          <div class={styles.instructionStep}>
            {isModern ?
              <ShareModernIcon class={styles.shareIcon}/> :
              <ShareIcon class={styles.shareIcon}/>
            }
            <p class={cn(
              styles.text,
              styles._bold
            )}>
              {texts.shareStep}
            </p>
          </div>

          <div class={styles.instructionStep}>
            {isModern ?
              <HomeScreenModernIcon class={styles.homeScreenIcon}/> :
              <HomeScreenIcon class={styles.homeScreenIcon}/>
            }
            <p class={cn(
              styles.text,
              styles._bold
            )}>
              {texts.homeScreenStep}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
})

export default IOSInstallPrompt
