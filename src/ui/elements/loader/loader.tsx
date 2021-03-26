import { h } from 'preact'
import type { FunctionComponent as FC } from 'preact'
import cn from 'classnames'

import { useTexts } from '~/core/hooks'
import { LoaderIcon } from '~/ui/icons'

import styles from './loader.styl'

type Props = {
  icon?: boolean
  text?: 'loading'|'connecting'|'sending'
  uppercase?: boolean
}

export const Loader: FC<Props> = ({
  icon,
  text,
  uppercase = true
}) => {
  const { texts } = useTexts()

  return (
    <div class={cn(
      styles.root,
      icon && styles._icon,
      text && styles._text,
      uppercase && styles._uppercase
    )}>
      {icon && <LoaderIcon/>}
      {text && texts[text]}
    </div>
  )
}
