import { h } from 'preact'
import type { FunctionComponent as FC } from 'preact'
import { useEffect, useRef, useCallback } from 'preact/hooks'

import { Button } from '~/ui/elements/button'
import { CloseIcon } from '~/ui/icons'

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

    animation = sidebarPopupRef?.current?.animate([
      { transform: 'translateX(160px)', opacity: 0 },
      { opacity: 1.0, offset: 0.1 },
      { transform: 'translateX(0)', opacity: 1.0 },
    ], {
      duration: 200,
      fill: 'forwards',
      easing: 'ease-out'
    })
  }, [])

  useEffect(() => {
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [handlePopState])

  return (
    <div
      class={styles.root}
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
