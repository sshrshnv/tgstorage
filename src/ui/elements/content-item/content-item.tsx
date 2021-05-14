import { h } from 'preact'
import type { FunctionComponent as FC } from 'preact'
import { useEffect, useRef } from 'preact/hooks'

import styles from './content-item.styl'

type Props = {
  message: {
    text: string
    date: string
  }
  index: number
  offset: number
  visible: boolean
  resizeObserver: ResizeObserver
  intersectionObserver: IntersectionObserver | undefined
}

export const ContentItem: FC<Props> = ({
  message,
  index,
  offset,
  visible = true,
  resizeObserver,
  intersectionObserver
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

  return (
    <div
      class={styles.root}
      style={{
        bottom: `${offset}px`,
        display: visible ? 'block' : 'none'
      }}
      ref={elRef}
      data-index={index}
    >
      <div class={styles.content}>
        <div class={styles.header}>
          {message.date}
        </div>
        <div class={styles.text}>
          {message.text}
        </div>
      </div>
    </div>
  )
}
