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
  overlayText?: string | false
}

export const ContentWrapper: FC<Props> = ({
  children,
  active,
  overlayText
}) => {
  const closeOverlay = useCallback(() => {
    self.history.back()
  }, [])

  return (
    <div class={cn(
      styles.root,
      (active && !overlayText) && styles._active
    )}>
      {children}

      <div class={cn(
        styles.overlay,
        overlayText && styles._active
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
