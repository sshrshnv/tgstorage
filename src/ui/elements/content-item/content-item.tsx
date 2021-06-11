import { h } from 'preact'
import type { FunctionComponent as FC } from 'preact'
import { useEffect, useRef, useMemo } from 'preact/hooks'
import cn from 'classnames'

import type { Message } from '~/core/store'
import { checkIsChecklistMessage } from '~/tools/handle-content'
import { Menu } from '~/ui/elements/menu'
import type { Props as MenuProps } from '~/ui/elements/menu'
import { Loader } from '~/ui/elements/loader'

import { ContentItemChecklist } from './content-item-checklist'
import { ContentItemMedia } from './content-item-media'
import styles from './content-item.styl'

type Props = {
  message: Message
  offset: number | undefined
  height: number | undefined
  visible: boolean
  mediaLoadAvailable: boolean
  resizeObserver: ResizeObserver
  intersectionObserver: IntersectionObserver | undefined
  loading?: boolean
  menu?: MenuProps | null
  onDelete?: (id: number) => void
  editText: (text: string) => Promise<void>
}

export const ContentItem: FC<Props> = ({
  message,
  offset,
  height,
  visible = true,
  mediaLoadAvailable,
  resizeObserver,
  intersectionObserver,
  loading,
  menu,
  onDelete,
  editText
}) => {
  const elRef = useRef<HTMLDivElement>(null)

  const isChecklist = useMemo(() => {
    return checkIsChecklistMessage(message.text)
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
    return () => onDelete?.(message.id)
  }, [])

  return useMemo(() => (
    <div
      id={`${message.id}`}
      class={cn(
        styles.root,
        !visible && styles._hidden
      )}
      style={typeof offset === 'number' ? {
        bottom: `${offset}px`
      } : undefined}
      ref={elRef}
    >
      <div class={styles.content}>
        <div class={styles.header}>
          {message.date}
        </div>

        <div class={styles.text}>
          {isChecklist ? (
            <ContentItemChecklist
              text={message.text}
              loading={loading}
              editText={editText}
            />
          ) : message.text}
        </div>

        {(message.media || message.fileMessages?.length) && (
          <ContentItemMedia
            message={message}
            mediaLoadAvailable={mediaLoadAvailable}
          />
        )}

        {loading && (
          <Loader class={styles.loader} grey/>
        )}

        {(!loading && menu) && (
          <Menu
            {...menu}
            class={styles.menu}
            position={(offset || 0) + (height || 0) > 240 ? 'top' : 'bottom'}
            parentRef={elRef}
          />
        )}
      </div>
    </div>
  ), [
    message.text,
    menu,
    loading,
    height,
    offset,
    visible
  ])
}
