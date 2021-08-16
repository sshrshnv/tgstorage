import type { FunctionComponent as FC } from 'preact'
import { h } from 'preact'
import { useCallback } from 'preact/hooks'
import cn from 'classnames'

import { Text } from '~/ui/elements/text'
import { Button } from '~/ui/elements/button'
import { CrossIcon } from '~/ui/icons'

import styles from './content-wrapper.styl'

type Props = {
  active: boolean
  secondary?: boolean
  overlayText?: string
}

export const ContentWrapper: FC<Props> = ({
  children,
  active,
  secondary,
  overlayText
}) => {
  const closeOverlay = useCallback(() => {
    self.history.back()
  }, [])

  return (
    <div class={cn(
      styles.root,
      (active && !secondary) && styles._active
    )}>
      {children}

      <div class={cn(
        styles.overlay,
        secondary && styles._active
      )}>
        <Button
          class={styles.overlayButton}
          icon={<CrossIcon/>}
          square
          onClick={closeOverlay}
        />
        <Text small grey>{overlayText}</Text>
      </div>
    </div>
  )
}
