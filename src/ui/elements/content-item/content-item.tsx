import { h } from 'preact'
import type { FunctionComponent as FC } from 'preact'
import { memo } from 'preact/compat'
import { useEffect, useRef } from 'preact/hooks'
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

  useEffect(() => () => {
    onDelete?.(message.id)
  }, [])

  return (
    <div
      id={`${message.id}`}
      class={cn(
        styles.root,
        typeof offset !== 'number' && styles._transparent
      )}
      style={{
        top: `${offset}px`,
        display: visible ? 'block' : 'none',
        opacity: typeof offset !== 'number' ? 0 : 1
      }}
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
            //positionY={(offset || 0) + (height || 0) > 240 ? 'bottom' : 'top'}
            parentRef={elRef}
          />
        )}
      </div>
    </div>
  )
})
