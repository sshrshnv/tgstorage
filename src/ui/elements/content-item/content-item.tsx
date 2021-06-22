import { h } from 'preact'
import type { FunctionComponent as FC } from 'preact'
import { memo } from 'preact/compat'
import { useEffect, useRef, useCallback } from 'preact/hooks'
import rafSchedule from 'raf-schd'
import cn from 'classnames'

import type { Message } from '~/core/store'
import { Menu } from '~/ui/elements/menu'
import type { Props as MenuProps } from '~/ui/elements/menu'
import { Loader } from '~/ui/elements/loader'

import styles from './content-item.styl'

type Props = {
  message: Message
  offset: number | undefined
  height: number | undefined
  visible: boolean
  resizeObserver: ResizeObserver
  intersectionObserver: IntersectionObserver | undefined
  loading?: boolean
  menu?: MenuProps | null
  emptyText?: string
  onDelete?: (id: number) => void
}

const TRANSPARENT_CLASS = 'TRNSPRNT'

export const ContentItem: FC<Props> = memo(({
  children,
  message,
  offset,
  height,
  visible,
  resizeObserver,
  intersectionObserver,
  loading,
  menu,
  onDelete,
}) => {
  const elRef = useRef<HTMLDivElement>(null)
  const isVisibleRef = useRef(false)

  const setStyles = useCallback(rafSchedule((elRef, isVisibleRef, offset) => {
    const el = elRef.current as HTMLDivElement
    if (!el || typeof offset !== 'number') return

    el.style.bottom = `${offset}px`
    if (!isVisibleRef.current) {
      isVisibleRef.current = true
      el.classList.remove(TRANSPARENT_CLASS)
    }
  }), [])

  useEffect(() => {
    if (!resizeObserver) return

    resizeObserver.observe(elRef.current)
    return () => resizeObserver.unobserve(elRef.current)
  }, [resizeObserver])

  useEffect(() => {
    if (!intersectionObserver) return

    intersectionObserver.observe(elRef.current)
    return () => intersectionObserver.unobserve(elRef.current)
  }, [intersectionObserver])

  useEffect(() => {
    setStyles(elRef, isVisibleRef, offset)
  }, [offset])

  useEffect(() => () => {
    setStyles.cancel()
    onDelete?.(message.id)
  }, [])

  return (
    <div
      id={`${message.id}`}
      class={cn(
        styles.root,
        !isVisibleRef.current && TRANSPARENT_CLASS,
        !visible && styles._hidden
      )}
      ref={elRef}
    >
      <div class={styles.content}>
        {children}

        {loading && (
          <Loader class={styles.loader} grey/>
        )}

        {(!loading && menu) && (
          <Menu
            {...menu}
            class={styles.menu}
            positionY={(offset || 0) + (height || 0) > 240 ? 'top' : 'bottom'}
            parentRef={elRef}
          />
        )}
      </div>
    </div>
  )
})
