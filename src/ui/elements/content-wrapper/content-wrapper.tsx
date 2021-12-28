import type { FunctionComponent as FC } from 'preact'
import { h } from 'preact'
import { useCallback, useEffect, useState } from 'preact/hooks'
import cn from 'classnames'

import { useCallbackRef } from '~/tools/hooks'
import { Text } from '~/ui/elements/text'
import { Button } from '~/ui/elements/button'

import styles from './content-wrapper.styl'

type Props = {
  active?: boolean
  secondary?: boolean
  overlayText?: string
}

export const ContentWrapper: FC<Props> = ({
  children,
  active,
  secondary,
  overlayText
}) => {
  const [background, setBackground] = useState(false)

  const closeOverlay = useCallback(() => {
    self.history.back()
  }, [])

  const [_handleMenu, handleMenuRef] = useCallbackRef(ev => {
    setBackground(!ev.detail)
  }, [setBackground])

  useEffect(() => {
    const handleMenu = ev => handleMenuRef.current?.(ev)

    self.document.addEventListener('menu', handleMenu, { passive: true })
    return () => self.document.removeEventListener('menu', handleMenu)
  }, [])

  return (
    <div class={cn(
      styles.root,
      (active && !secondary) && styles._active,
      background && styles._background
    )}>
      {children}

      <div class={cn(
        styles.overlay,
        secondary && styles._active
      )}>
        <Button
          class={styles.overlayButton}
          icon="cross"
          square
          onClick={closeOverlay}
        />
        <Text small grey>{overlayText}</Text>
      </div>
    </div>
  )
}
