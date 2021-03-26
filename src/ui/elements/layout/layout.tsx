import { h } from 'preact'
import type { FunctionComponent as FC } from 'preact'
import { useEffect, useRef, useState } from 'preact/hooks'
import cn from 'classnames'

import styles from './layout.styl'

type Props = {
  center?: boolean
  sidebar?: boolean
  content?: boolean
  animationFallbackCheck?: boolean
}

export const Layout: FC<Props> = ({
  children,
  center,
  sidebar,
  content,
  animationFallbackCheck
}) => {
  const layoutRef = useRef<HTMLDivElement>(null)
  const [animationFallback, setAnimationFallback] = useState(false)

  useEffect(() => {
    if (!animationFallbackCheck || !!layoutRef?.current?.animate) return
    setAnimationFallback(true)
  }, [layoutRef, animationFallbackCheck])

  return (
    <div
      class={cn(
        styles.root,
        animationFallback && 'animationFallback',
        center && styles._center,
        sidebar && styles._sidebar,
        content && styles._content
      )}
      ref={layoutRef}
    >
      { children }
    </div>
  )
}
