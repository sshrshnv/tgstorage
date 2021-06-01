import { h } from 'preact'
import type { FunctionComponent as FC, RefObject } from 'preact'
import { useState, useCallback, useEffect, useRef } from 'preact/hooks'
import cn from 'classnames'

import { Button } from '~/ui/elements/button'
import { MenuIcon } from '~/ui/icons'
import { animationClassName } from '~/ui/styles/animation'

import styles from './menu.styl'

export type Props = {
  class?: string
  items: ({
    title: string
    icon?: h.JSX.Element | null
    warning?: boolean
    danger?: boolean
    onClick?: (ev?: MouseEvent) => void
  } | null)[]
  horizontal?: boolean
  position?: 'top'|'bottom'
  parentRef?: RefObject<HTMLDivElement>
  onClose?: () => void
}

export const Menu: FC<Props> = ({
  class: className,
  items,
  horizontal,
  position = 'top',
  parentRef,
  onClose
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [expanded, setExpanded] = useState(false)

  const toggle = useCallback((ev?) => {
    ev?.stopPropagation()
    if (expanded) {
      onClose?.()
    }
    setExpanded(!expanded)
  }, [expanded])

  useEffect(() => {
    if (!expanded) return

    dropdownRef?.current?.animate?.([
      { transform: 'scale(0)', opacity: 0 },
      { opacity: 1, offset: 0.5 },
      { transform: 'scale(1)', opacity: 1 }
    ], {
      duration: 200,
      fill: 'forwards',
      easing: 'ease-in-out'
    })
  }, [expanded])

  useEffect(() => {
    let touchStartTimeoutId = 0
    const handleTouchStart = () => {
      touchStartTimeoutId = window.setTimeout(toggle, 500)
    }
    const handleTouchEnd = () => {
      if (!touchStartTimeoutId) return
      window.clearTimeout(touchStartTimeoutId)
      touchStartTimeoutId = 0
    }
    const handleContextMenu = () => toggle()

    parentRef?.current?.addEventListener('contextmenu', handleContextMenu, { passive: true })
    parentRef?.current?.addEventListener('touchstart', handleTouchStart, { passive: true })
    parentRef?.current?.addEventListener('touchmove', handleTouchEnd, { passive: true })
    parentRef?.current?.addEventListener('touchend', handleTouchEnd, { passive: true })
    return () => {
      parentRef?.current?.removeEventListener('contextmenu', handleContextMenu)
      parentRef?.current?.removeEventListener('touchstart', handleTouchStart)
      parentRef?.current?.removeEventListener('touchmove', handleTouchEnd)
      parentRef?.current?.removeEventListener('touchend', handleTouchEnd)
    }
  }, [parentRef])

  if (!items.length) {
    return null
  }

  return (
    <div
      class={cn(
        className,
        styles.root,
        styles[animationClassName],
        position && styles[`_position-${position}`],
        horizontal && styles._horizontal,
        expanded && styles._expanded
      )}
      onClick={toggle}
    >
      <Button
        class={styles.button}
        icon={<MenuIcon/>}
        inline
      />
      {expanded && (
        <div
          class={styles.dropdown}
          ref={dropdownRef}
        >
          {items.map((item, index) => item && (
            <div
              key={index}
              class={cn(
                styles.item,
                item.warning && styles._warning,
                item.danger && styles._danger
              )}
              onClick={item.onClick}
            >
              {item.icon}
              {item.title}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
