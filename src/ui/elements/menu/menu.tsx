import { h } from 'preact'
import type { FunctionComponent as FC, RefObject } from 'preact'
import { memo } from 'preact/compat'
import { useState, useEffect, useRef } from 'preact/hooks'
import cn from 'classnames'

import { useCallbackRef, useUpdatableRef } from '~/tools/hooks'
import { Button } from '~/ui/elements/button'
import { MenuIcon } from '~/ui/icons'
import { animationClassName } from '~/ui/styles/animation'

import styles from './menu.styl'

const ITEM_HEIGHT = 40
const OFFSET = 60

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
  parentRef?: RefObject<HTMLDivElement>
  onClose?: () => void
}

export const Menu: FC<Props> = memo(({
  class: className,
  items,
  horizontal,
  parentRef,
  onClose
}) => {
  const [expanded, setExpanded] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const positionXRef = useRef('right')
  const positionYRef = useRef('top')
  const itemsCountRef = useUpdatableRef(items.length)

  const [toggle, toggleRef] = useCallbackRef((ev?) => {
    ev?.preventDefault()
    ev?.stopPropagation()
    if (expanded) {
      onClose?.()
    } else {
      const { top = 0 } = menuRef.current?.getBoundingClientRect() || {}
      const menuHeight = top + itemsCountRef.current * ITEM_HEIGHT + OFFSET
      positionYRef.current = menuHeight > self.innerHeight ? 'bottom' : 'top'
    }
    setExpanded(!expanded)
  }, [expanded, onClose])

  useEffect(() => {
    if (!expanded) return

    dropdownRef.current?.animate?.([
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
    const parentEl = parentRef?.current
    const toggle = toggleRef.current

    if (!parentEl) return

    let touchStartTimeoutId = 0
    const handleTouchStart = (ev) => {
      ev.stopPropagation()
      touchStartTimeoutId = self.setTimeout(toggle, 500)
    }
    const handleTouchEnd = () => {
      if (!touchStartTimeoutId) return
      self.clearTimeout(touchStartTimeoutId)
      touchStartTimeoutId = 0
    }
    const handleContextMenu = (ev) => toggle(ev)

    parentEl.addEventListener('contextmenu', handleContextMenu, { passive: false })
    parentEl.addEventListener('touchstart', handleTouchStart, { passive: true })
    parentEl.addEventListener('touchmove', handleTouchEnd, { passive: true })
    parentEl.addEventListener('touchend', handleTouchEnd, { passive: true })
    return () => {
      parentEl.removeEventListener('contextmenu', handleContextMenu)
      parentEl.removeEventListener('touchstart', handleTouchStart)
      parentEl.removeEventListener('touchmove', handleTouchEnd)
      parentEl.removeEventListener('touchend', handleTouchEnd)
    }
  }, [])

  return !items.length ? null : (
    <div
      class={cn(
        className,
        styles.root,
        styles[animationClassName],
        styles[`_position-${positionXRef.current}`],
        styles[`_position-${positionYRef.current}`],
        horizontal && styles._horizontal,
        expanded && styles._expanded
      )}
      ref={menuRef}
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
})
