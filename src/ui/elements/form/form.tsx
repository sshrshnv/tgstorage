import { h } from 'preact'
import type { FunctionComponent as FC } from 'preact'
import { useCallback } from 'preact/hooks'
import cn from 'classnames'

import styles from './form.styl'

type Props = {
  center?: boolean
  onSubmit?: () => void
}

export const Form: FC<Props> = ({
  children,
  center,
  onSubmit
}) => {
  const handleSubmit = useCallback((ev) => {
    ev.preventDefault()
    onSubmit?.()
  }, [onSubmit])

  return (
    <form
      class={cn(
        styles.root,
        center && styles._center
      )}
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      { children }
    </form>
  )
}
