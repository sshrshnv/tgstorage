import { h } from 'preact'
import type { FunctionComponent as FC } from 'preact'
import cn from 'classnames'

import { Loader } from '~/ui/elements/loader'

import styles from './button.styl'

export type Props = {
  class?: string
  type?: 'button' | 'submit'
  disabled?: boolean
  loading?: boolean
  brand?: boolean
  light?: boolean
  uppercase?: boolean
  round?: boolean
  square?: boolean
  outline?: boolean
  inline?: boolean
  icon?: h.JSX.Element | null
  onClick?: () => void
}

export const Button: FC<Props> = ({
  children,
  class: className,
  type = 'button',
  disabled,
  loading,
  brand,
  light,
  uppercase,
  round,
  square,
  outline,
  inline,
  icon,
  onClick
}) => {
  return (
    <button
      class={cn(
        styles.root,
        className,
        disabled && styles._disabled,
        loading && styles._loading,
        brand && styles._brand,
        light && styles._light,
        uppercase && styles._uppercase,
        round && styles._round,
        square && styles._square,
        outline && styles._outline,
        inline && styles._inline,
      )}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      { icon }
      { loading ? (
        <Loader icon/>
      ) : children }
    </button>
  )
}
