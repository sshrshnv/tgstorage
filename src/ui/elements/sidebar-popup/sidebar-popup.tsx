import type { FunctionComponent as FC } from 'preact'
import { h } from 'preact'
import { memo } from 'preact/compat'
import cn from 'classnames'

import { Slide, useSlide } from '~/ui/elements/slide'
import { Button } from '~/ui/elements/button'
import { Loader } from '~/ui/elements/loader'

import styles from './sidebar-popup.styl'

type Props = {
  title: string
  loading?: boolean
  withoutPaddings?: boolean
  onClose: () => void
}

export const SidebarPopup: FC<Props> = memo(({
  children,
  title,
  loading,
  withoutPaddings,
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
          icon="back"
          square
          onClick={closeSlide}
        />
        <h2 class={styles.title}>
          {title}
        </h2>
        {loading && (
          <Loader class={styles.loader} brand/>
        )}
      </div>
      <div class={cn(
        styles.content,
        !withoutPaddings && styles._paddings,
        loading && styles._disabled
      )}>
        {children}
      </div>
    </Slide>
  )
})
