import type { FunctionComponent as FC } from 'preact'
import { h } from 'preact'
import { memo } from 'preact/compat'
import cn from 'classnames'

import { Loader } from '~/ui/elements/loader'

import styles from './link.styl'

export type Props = {
  class?: string
  href: string
  disabled?: boolean
  loading?: boolean
  brand?: boolean
  alarm?: boolean
  light?: boolean
  error?: boolean
  uppercase?: boolean
  round?: boolean
  square?: boolean
  outline?: boolean
  inline?: boolean
  onClick?: (ev?) => void
}

export const Link: FC<Props> = memo(({
  children,
  class: outerStyles,
  href,
  disabled,
  loading,
  brand,
  alarm,
  light,
  error,
  uppercase,
  round,
  square,
  outline,
  inline,
  onClick
}) => {
  return loading ? (
    <Loader brand big/>
  ) : (
    <a
      class={cn(
        styles.root,
        outerStyles,
        disabled && styles._disabled,
        loading && styles._loading,
        brand && styles._brand,
        alarm && styles._alarm,
        light && styles._light,
        error && styles._error,
        uppercase && styles._uppercase,
        round && styles._round,
        square && styles._square,
        outline && styles._outline,
        inline && styles._inline
      )}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </a>
  )
})
