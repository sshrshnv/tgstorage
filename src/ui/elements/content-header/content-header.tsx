import { Fragment, h } from 'preact'
import type { FunctionComponent as FC } from 'preact'
import { memo } from 'preact/compat'
import cn from 'classnames'

import { Button } from '~/ui/elements/button'
import { Input } from '~/ui/elements/input'
import { useSlide } from '~/ui/elements/slide'
import { Loader } from '~/ui/elements/loader'

import styles from './content-header.styl'

type Props = {
  title?: string
  inputPlaceholder?: string
  inputValue?: string
  button?: h.JSX.Element | null
  loading?: boolean
  withoutDesktopBack?: boolean
  onInput?: (value: string) => void
}

export const ContentHeader: FC<Props> = memo(({
  title,
  inputPlaceholder,
  inputValue,
  button,
  loading,
  withoutDesktopBack,
  onInput
}) => {
  const { closeSlide } = useSlide()

  return (
    <header class={cn(
      styles.root,
      withoutDesktopBack && styles._withoutDesktopBack
    )}>
      <Button
        class={styles.backButton}
        icon="back"
        square
        onClick={closeSlide}
      />
      {title && (
        <div class={styles.title}>{title}</div>
      )}
      {inputPlaceholder && (
        <Fragment>
          <Input
            class={styles.input}
            value={inputValue}
            placeholder={inputPlaceholder}
            border={false}
            clear={!loading}
            autoFocus
            onInput={onInput}
          />
        </Fragment>
      )}
      {loading ? (
        <Loader class={styles.loader}/>
      ) : button}
    </header>
  )
})
