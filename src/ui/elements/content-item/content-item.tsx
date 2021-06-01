import { h } from 'preact'
import type { FunctionComponent as FC } from 'preact'
import { useEffect, useRef, useMemo } from 'preact/hooks'
import cn from 'classnames'

import { checkIsChecklist } from '~/tools/handle-checklist'
import { Menu } from '~/ui/elements/menu'
import type { Props as MenuProps } from '~/ui/elements/menu'
import { Loader } from '~/ui/elements/loader'

import { ContentItemChecklist } from './content-item-checklist'
import styles from './content-item.styl'

type Props = {
  message: {
    id: number
    text: string
    date: string
  }
  index: number
  offset: number
  height: number
  visible: boolean
  resizeObserver: ResizeObserver
  intersectionObserver: IntersectionObserver | undefined
  loading?: boolean
  menu?: MenuProps | null
  onDelete?: (index: number) => void
  editText: (text: string) => Promise<void>
}

export const ContentItem: FC<Props> = ({
  message,
  index,
  offset,
  height,
  visible = true,
  resizeObserver,
  intersectionObserver,
  loading,
  menu,
  onDelete,
  editText
}) => {
  const elRef = useRef<HTMLDivElement>(null)

  const isChecklist = useMemo(() => {
    return checkIsChecklist(message.text)
  }, [message.text])

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
    return () => onDelete?.(index)
  }, [])

  return useMemo(() => (
    <div
      class={cn(
        styles.root,
        !visible && styles._hidden
      )}
      style={{
        bottom: `${offset}px`
      }}
      ref={elRef}
      data-id-index={`${message.id}-${index}`}
    >
      <div class={styles.content}>
        <div class={styles.header}>
          {message.date}
        </div>

        <div class={styles.text}>
          { isChecklist ? (
            <ContentItemChecklist
              text={message.text}
              loading={loading}
              editText={editText}
            />
          ) : message.text}
        </div>

        {loading && (
          <Loader class={styles.loader} grey/>
        )}

        {(!loading && menu) && (
          <Menu
            {...menu}
            class={styles.menu}
            position={offset + height > 240 ? 'top' : 'bottom'}
            parentRef={elRef}
          />
        )}
      </div>
    </div>
  ), [
    message.text,
    menu,
    index,
    loading,
    height,
    offset,
    visible
  ])
}
