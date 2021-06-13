import { h } from 'preact'
import type { FunctionComponent as FC } from 'preact'
import { useEffect, useRef, useMemo, useCallback } from 'preact/hooks'
import rafSchedule from 'raf-schd'
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
  resizeObserver: ResizeObserver
  intersectionObserver: IntersectionObserver | undefined
  loading?: boolean
  menu?: MenuProps | null
  onDelete?: (id: number) => void
  editText: (text: string) => Promise<void>
}

const TRANSPARENT_CLASS = 'transparent'

export const ContentItem: FC<Props> = ({
  message,
  offset,
  height,
  visible,
  resizeObserver,
  intersectionObserver,
  loading,
  menu,
  onDelete,
  editText
}) => {
  const elRef = useRef<HTMLDivElement>(null)
  const isVisibleRef = useRef(false)

  const isChecklist = useMemo(() => {
    return checkIsChecklistMessage(message.text)
  }, [message.text])

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

  return useMemo(() => (
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

        {(message.media || message.mediaMessages?.length) && (
          <ContentItemMedia
            message={message}
            mediaLoadAvailable={visible}
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
    message.media,
    menu,
    loading,
    height,
    offset,
    visible
  ])
}
