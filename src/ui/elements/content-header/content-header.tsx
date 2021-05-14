import { Fragment, h } from 'preact'
import type { FunctionComponent as FC } from 'preact'
import cn from 'classnames'

import { Button } from '~/ui/elements/button'
import { Input } from '~/ui/elements/input'
import { useSlide } from '~/ui/elements/slide'
import { BackIcon } from '~/ui/icons'

import styles from './content-header.styl'

type Props = {
  title?: string
  placeholder?: string
  button?: h.JSX.Element | null
  withoutDesktopBack?: boolean
}

export const ContentHeader: FC<Props> = ({
  title,
  placeholder,
  button,
  withoutDesktopBack
}) => {
  const { closeSlide } = useSlide()

  return (
    <header class={cn(
      styles.root,
      withoutDesktopBack && styles._withoutDesktopBack
    )}>
      <Button
        class={styles.backButton}
        icon={<BackIcon/>}
        square
        onClick={closeSlide}
      />
      {title && (
        <div class={styles.title}>{title}</div>
      )}
      {placeholder && (
        <Fragment>
          <Input
            class={styles.input}
            placeholder={placeholder}
            border={false}
            clear
            autoFocus
          />
        </Fragment>
      )}
      {button}
    </header>
  )
}
