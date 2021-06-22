import { h } from 'preact'
import type { FunctionComponent as FC } from 'preact'
import { memo } from 'preact/compat'

import { Slide, useSlide } from '~/ui/elements/slide'
import { Button } from '~/ui/elements/button'
import { BackIcon } from '~/ui/icons'

import styles from './sidebar-popup.styl'

type Props = {
  title: string
  onClose: () => void
}

export const SidebarPopup: FC<Props> = memo(({
  children,
  title,
  onClose
}) => {
  const { closeSlide } = useSlide()

  return (
    <Slide
      name="sidebar"
      class={styles.root}
      onClose={onClose}
    >
      <div class={styles.header}>
        <Button
          class={styles.backButton}
          icon={<BackIcon/>}
          square
          onClick={closeSlide}
        />
        <h2 class={styles.title}>
          {title}
        </h2>
      </div>
      <div class={styles.content}>
        {children}
      </div>
    </Slide>
  )
})
