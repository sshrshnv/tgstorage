import type { FunctionComponent as FC } from 'preact'
import { h } from 'preact'
import { useState, useEffect } from 'preact/hooks'
import cn from 'classnames'

import { useCallbackRef } from '~/tools/hooks'

import styles from './icon.styl'

type SVGProps = {
  class?: string
  style?: { fill: string }
  onClick?: () => void
}

type Props = SVGProps & {
  icon: string
  logo?: boolean
}

export const Icon: FC<Props> = ({
  class: outerStyles,
  style,
  icon,
  logo,
  onClick
}) => {
  const [LoadedIcon, setLoadedIcon] = useState<any>(null)

  const [_loadIcon, loadIconRef] = useCallbackRef(async () => {
    const importIcon = await import(
      /* webpackChunkName: 'icons' */
      /* webpackPreload: true */
      '~/ui/icons'
    )
    const module = await importIcon.default(icon)
    setLoadedIcon(module)
  }, [icon, setLoadedIcon])

  useEffect(() => {
    const loadIcon = () => loadIconRef.current?.()
    loadIcon()
  }, [icon])

  return LoadedIcon ? (
    <LoadedIcon.default
      class={cn(
        outerStyles,
        logo && styles._logo
      )}
      style={style}
      onClick={onClick}
    />
  ) : <svg/>
}
