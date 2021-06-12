import { h } from 'preact'
import type { FunctionComponent as FC } from 'preact'
import { useEffect, useCallback, useRef } from 'preact/hooks'
import cn from 'classnames'

import { animationClassName } from '~/ui/styles/animation'

import styles from './slide.styl'

type Props = {
  name: string
  class?: string
  onClose?: () => void
}

const slides: string[] = []

export const Slide: FC<Props> = ({
  children,
  name,
  class: className,
  onClose
}) => {
  const slideRef = useRef<HTMLDivElement>(null)
  let animation: Animation | undefined

  const handlePopState = useCallback(() => {
    if (slides[slides.length - 1] !== name) {
      return
    }

    slides.length = slides.length - 1

    if (!animation) {
      onClose?.()
      return
    }

    animation.reverse()
    setTimeout(() => onClose?.(), 200)
  }, [animation, onClose])

  useEffect(() => {
    slides.push(name)
    history.pushState(history.state, document.title, location.href)

    animation = slideRef?.current?.animate?.([
      { transform: 'translateX(80px)', opacity: 0 },
      { transform: 'translateX(0)', opacity: 1 },
    ], {
      duration: 200,
      fill: 'forwards',
      easing: 'ease-in-out'
    })
  }, [])

  useEffect(() => {
    self.addEventListener('popstate', handlePopState)
    return () => self.removeEventListener('popstate', handlePopState)
  }, [handlePopState])

  return (
    <div
      class={cn(
        className,
        styles.root,
        styles[animationClassName]
      )}
      ref={slideRef}
    >
      {children}
    </div>
  )
}
