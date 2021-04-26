import { h } from 'preact'
import type { FunctionComponent as FC } from 'preact'
import cn from 'classnames'

import { Button } from '~/ui/elements/button'
import { useSlide } from '~/ui/elements/slide'
import { BackIcon } from '~/ui/icons'

import styles from './content-header.styl'

type Props = {
  title?: string
  placeholder?: string
}

export const ContentHeader: FC<Props> = ({
  title
}) => {
  const { closeSlide } = useSlide()

  return (
    <header class={cn(
      styles.root,
      title && styles._withTitle
    )}>
      <Button
        class={styles.backButton}
        icon={<BackIcon/>}
        square
        onClick={closeSlide}
      />
      { title && (
        <h2 class={styles.title}>{title}</h2>
      )}
    </header>
  )
}
