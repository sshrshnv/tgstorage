import { h } from 'preact'
import type { FunctionComponent as FC, RefObject } from 'preact'
import { memo } from 'preact/compat'
import { useState, useEffect, useRef } from 'preact/hooks'
import cn from 'classnames'

import { useCallbackRef, useUpdatableRef } from '~/tools/hooks'
import { timer } from '~/tools/timer'
import { checkIsDesktop, checkIsIOS } from '~/tools/detect-platform'
import { Button } from '~/ui/elements/button'
import { Icon } from '~/ui/elements/icon'
import { animationClassName } from '~/ui/styles'

import styles from './menu.styl'

const ITEM_HEIGHT = 40
const OFFSET = 60

export type Props = {
  class?: string
  items: ({
    title: string
    hiddenTitle?: string
    icon?: string
    url?: string
    warning?: boolean
    danger?: boolean
    onClick?: (ev?: MouseEvent) => void
  } | null)[]
  icon?: string
  horizontal?: boolean
  parentRef?: RefObject<HTMLDivElement>
  layoutRef?: RefObject<HTMLDivElement>
  forceOpened?: boolean
  closeTimeout?: number
  withEvent?: boolean
  onClose?: () => void
}

export const Menu: FC<Props> = memo(({
  class: outerStyles,
  items,
  icon,
  horizontal,
  parentRef,
  layoutRef,
  forceOpened,
  closeTimeout,
  withEvent,
  onClose
}) => {
  const [expanded, setExpanded] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const positionXRef = useRef('right')
  const positionYRef = useRef('top')
  const itemsCountRef = useUpdatableRef(items.length)

  const [toggle, toggleRef] = useCallbackRef(async (ev?) => {
    if (ev?.target?.nodeName.toLowerCase() !== 'a') {
      ev?.preventDefault()
    }
    ev?.stopPropagation()

    if (expanded) {
      if (closeTimeout) {
        await timer(closeTimeout)
      }
      onClose?.()
    } else {
      const { top = 0 } = menuRef.current?.getBoundingClientRect() || {}
      const menuHeight = top + (itemsCountRef.current || 0) * ITEM_HEIGHT + OFFSET
      positionYRef.current = menuHeight > self.innerHeight ? 'bottom' : 'top'
    }

    if (withEvent) {
      self.document.dispatchEvent(new CustomEvent('menu', { detail: expanded }))
    }

    setExpanded(!expanded)
  }, [expanded, onClose])

  useEffect(() => {
    if (!expanded) return

    const toggle = (ev) => toggleRef.current?.(ev)

    dropdownRef.current?.animate?.([
      { transform: 'scale(0)', opacity: 0 },
      { opacity: 1, offset: 0.5 },
      { transform: 'scale(1)', opacity: 1 }
    ], {
      duration: 200,
      fill: 'forwards',
      easing: 'ease-in-out'
    })

    if (checkIsIOS() && layoutRef?.current) {
      const layoutEl = layoutRef.current
      layoutEl.addEventListener('click', toggle)
      return () => layoutEl.removeEventListener('click', toggle)
    }

    self.document.addEventListener('click', toggle)
    return () => self.document.removeEventListener('click', toggle)
  }, [expanded])

  useEffect(() => {
    if (!forceOpened) return
    toggleRef.current?.()
  }, [forceOpened])

  useEffect(() => {
    const parentEl = parentRef?.current
    const toggle = (ev?) => toggleRef.current?.(ev)

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

    if (checkIsDesktop()) {
      parentEl.addEventListener('contextmenu', handleContextMenu, { passive: false })
    }
    parentEl.addEventListener('touchstart', handleTouchStart, { passive: true })
    parentEl.addEventListener('touchmove', handleTouchEnd, { passive: true })
    parentEl.addEventListener('touchend', handleTouchEnd, { passive: true })
    return () => {
      if (checkIsDesktop()) {
        parentEl.removeEventListener('contextmenu', handleContextMenu)
      }
      parentEl.removeEventListener('touchstart', handleTouchStart)
      parentEl.removeEventListener('touchmove', handleTouchEnd)
      parentEl.removeEventListener('touchend', handleTouchEnd)
    }
  }, [])

  return !items.length ? null : (
    <div
      class={cn(
        outerStyles,
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
        icon={icon || 'menu'}
        inline
      />
      {expanded && (
        <div
          class={styles.dropdown}
          ref={dropdownRef}
        >
          {items.map((item, index) => item?.url ? (
            <a
              key={index}
              class={styles.item}
              href={item.url}
              rel="noopener noreferrer"
              target="_blank"
            >
              {item.icon && (
                <Icon icon={item.icon}/>
              )}
              {item.title}
            </a>
          ) : item ? (
            <div
              key={index}
              class={cn(
                styles.item,
                item.warning && styles._warning,
                item.danger && styles._danger
              )}
              onClick={item.onClick}
            >
              {item.icon && (
                <Icon icon={item.icon}/>
              )}
              {item.title}
            </div>
          ) : null)}
        </div>
      )}
    </div>
  )
})
