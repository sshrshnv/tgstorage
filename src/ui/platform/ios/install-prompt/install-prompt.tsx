import type { FunctionComponent as FC } from 'preact'
import { h } from 'preact'
import { memo } from 'preact/compat'
import { useMemo, useCallback, useEffect, useState } from 'preact/hooks'
import cn from 'classnames'

import { useTexts } from '~/core/hooks'
import { useCallbackRef } from '~/tools/hooks'
import { getIOSVersion } from '~/tools/detect-platform'

import {
  SafariIcon, ShareIcon, ShareModernIcon,
  HomeScreenIcon, HomeScreenModernIcon
} from './icons'
import styles from './install-prompt.styl'

export const InstallPrompt: FC = memo(() => {
  const { texts } = useTexts('platform')
  const [rendered, setRendered] = useState(false)
  const [visible, setVisible] = useState(false)

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
            {texts.install.title}
          </p>
          <button
            class={styles.cancel}
            onClick={handleCancel}
          >
            {texts.install.cancel}
          </button>
        </div>

        <div class={styles.instruction}>
          <div class={styles.instructionStep}>
            <SafariIcon class={styles.safariIcon}/>
            <p class={cn(
              styles.text,
              styles._bold
            )}>
              {texts.install.safariStep}
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
              {texts.install.shareStep}
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
              {texts.install.homeScreenStep}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
})
