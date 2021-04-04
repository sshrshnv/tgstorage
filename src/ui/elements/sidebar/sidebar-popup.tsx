import { h } from 'preact'
import type { FunctionComponent as FC } from 'preact'
import { useEffect, useRef, useCallback } from 'preact/hooks'
import cn from 'classnames'

import { Button } from '~/ui/elements/button'
import { CloseIcon } from '~/ui/icons'
import { animationClassName } from '~/ui/styles/animation'

import styles from './sidebar-popup.styl'

type Props = {
  title: string
  onClose: () => void
}

export const SidebarPopup: FC<Props> = ({
  children,
  title,
  onClose
}) => {
  let animation: Animation | null = null
  const sidebarPopupRef = useRef<HTMLDivElement>(null)

  const close = useCallback(() => {
    history.back()
  }, [])

  const handlePopState = useCallback(() => {
    if (!animation) {
      onClose()
      return
    }

    animation.reverse()
    setTimeout(onClose, 200)
  }, [animation, onClose])

  useEffect(() => {
    history.pushState(history.state, document.title, location.href)

    animation = sidebarPopupRef?.current?.animate?.([
      { transform: 'translateX(80px)', opacity: 0 },
      { transform: 'translateX(0)', opacity: 1 },
    ], {
      duration: 200,
      fill: 'forwards',
      easing: 'ease-in-out'
    })
  }, [])

  useEffect(() => {
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [handlePopState])

  return (
    <div
      class={cn(
        styles.root,
        styles[animationClassName]
      )}
      ref={sidebarPopupRef}
    >
      <div class={styles.header}>
        <h2 class={styles.title}>
          {title}
        </h2>
        <Button
          class={styles.button}
          icon={<CloseIcon/>}
          square
          onClick={close}
        />
      </div>
      <div class={styles.content}>
        {children}
      </div>
    </div>
  )
}
