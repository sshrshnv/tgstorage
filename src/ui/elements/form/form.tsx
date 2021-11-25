import { h } from 'preact'
import type { FunctionComponent as FC, RefObject } from 'preact'
import { useCallback } from 'preact/hooks'
import cn from 'classnames'

import styles from './form.styl'

type Props = {
  class?: string
  center?: boolean
  forwardedRef?: RefObject<HTMLFormElement>
  onSubmit?: () => void
}

export const Form: FC<Props> = ({
  children,
  class: outerStyles,
  center,
  forwardedRef,
  onSubmit
}) => {
  const handleSubmit = useCallback((ev) => {
    ev.preventDefault()
    onSubmit?.()
  }, [onSubmit])

  return (
    <form
      class={cn(
        outerStyles,
        styles.root,
        center && styles._center
      )}
      autoComplete="off"
      ref={forwardedRef}
      onSubmit={handleSubmit}
    >
      {children}
    </form>
  )
}
