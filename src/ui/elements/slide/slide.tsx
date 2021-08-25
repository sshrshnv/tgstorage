import type { FunctionComponent as FC } from 'preact'
import { h } from 'preact'
import { memo } from 'preact/compat'
import { useEffect, useRef, useMemo } from 'preact/hooks'
import cn from 'classnames'

import { useUpdatableRef, useCallbackRef } from '~/tools/hooks'
import { checkIsIOS } from '~/tools/detect-device'
import { animationClassName } from '~/ui/styles'

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
  const isPerformance = useMemo(() => checkIsIOS(), [])

  const [_handlePopState, handlePopStateRef] = useCallbackRef(() => {
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
  }, [name, onClose])

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
  }, [])

  useEffect(() => {
    const handlePopState = () => handlePopStateRef.current()
    self.addEventListener('popstate', handlePopState)
    return () => self.removeEventListener('popstate', handlePopState)
  }, [])

  return (
    <div
      id={id}
      class={cn(
        className,
        styles.root,
        styles[animationClassName],
        isPerformance && styles._performance
      )}
      ref={slideRef}
    >
      {children}
    </div>
  )
})
