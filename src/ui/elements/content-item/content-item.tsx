import type { FunctionComponent as FC } from 'preact'
import { h } from 'preact'
import { memo } from 'preact/compat'
import { useEffect, useRef } from 'preact/hooks'
import cn from 'classnames'

import type { Message } from '~/core/store'
import { useUpdatableRef } from '~/tools/hooks'
import { Menu } from '~/ui/elements/menu'
import type { Props as MenuProps } from '~/ui/elements/menu'
import { Loader } from '~/ui/elements/loader'

import styles from './content-item.styl'

type Props = {
  message: Message
  offset: number | undefined
  visible: boolean
  last: boolean
  resizeObserver?: ResizeObserver
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
  visible,
  last,
  resizeObserver,
  intersectionObserver,
  loading,
  menu,
  onDelete,
}) => {
  const elRef = useRef<HTMLDivElement>(null)
  const finishMarkerRef = useRef<HTMLDivElement>(null)
  const messageIdRef = useUpdatableRef(message.id)
  const onDeleteRef = useUpdatableRef(onDelete)

  useEffect(() => {
    if (!resizeObserver || !elRef.current) return

    const el = elRef.current
    resizeObserver.observe(el)

    return () => resizeObserver.unobserve(el)
  }, [resizeObserver])

  useEffect(() => {
    if (!intersectionObserver || !elRef.current) return

    const el = elRef.current
    intersectionObserver.observe(el)

    return () => intersectionObserver.unobserve(el)
  }, [intersectionObserver])

  useEffect(() => {
    if (!last || !intersectionObserver || !finishMarkerRef.current) return

    const el = finishMarkerRef.current
    intersectionObserver.observe(el)

    return () => intersectionObserver.unobserve(el)
  }, [last, intersectionObserver])

  useEffect(() => () => {
    onDeleteRef.current?.(messageIdRef.current)
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
            parentRef={elRef}
          />
        )}

        {last && (
          <div
            class={styles.finishMarker}
            ref={finishMarkerRef}
          />
        )}
      </div>
    </div>
  )
})
