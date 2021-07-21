import type { FunctionComponent as FC } from 'preact'
import { h } from 'preact'
import { memo } from 'preact/compat'
import { useEffect, useCallback, useRef } from 'preact/hooks'
import cn from 'classnames'

import { useUpdatableRef } from '~/tools/hooks'
import { animationClassName } from '~/ui/styles/animation'

import styles from './slide.styl'

type Props = {
  id?: string
  name: string
  class?: string
  onClose?: () => void
}

const slides: string[] = []

export const Slide: FC<Props> = memo(({
  children,
  id,
  name,
  class: className,
  onClose
}) => {
  const slideRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<Animation|undefined>()
  const nameRef = useUpdatableRef(name)

  const handlePopState = useCallback(() => {
    if (slides[slides.length - 1] !== name) {
      return
    }

    slides.length = slides.length - 1

    if (!animationRef.current) {
      onClose?.()
      return
    }

    animationRef.current.reverse()
    setTimeout(() => onClose?.(), 200)
  }, [name, animationRef, onClose])

  useEffect(() => {
    slides.push(nameRef.current)
    history.pushState(history.state, document.title, location.href)

    animationRef.current = slideRef?.current?.animate?.([
      { transform: 'translateX(80px)', opacity: 0 },
      { transform: 'translateX(0)', opacity: 1 },
    ], {
      duration: 200,
      fill: 'forwards',
      easing: 'ease-in-out'
    })
  }, [nameRef])

  useEffect(() => {
    self.addEventListener('popstate', handlePopState)
    return () => self.removeEventListener('popstate', handlePopState)
  }, [handlePopState])

  return (
    <div
      id={id}
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
})
