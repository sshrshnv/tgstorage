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
  uppercase?: boolean
  round?: boolean
  square?: boolean
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
  uppercase,
  round,
  square,
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
        uppercase && styles._uppercase,
        round && styles._round,
        square && styles._square
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
