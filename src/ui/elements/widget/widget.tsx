import type { FunctionComponent as FC } from 'preact'
import { h, Fragment } from 'preact'
import { memo } from 'preact/compat'
import { useCallback, useMemo, useEffect, useRef } from 'preact/hooks'
import cn from 'classnames'

import { checkIsIOS } from '~/tools/detect-platform'
import { Text } from '~/ui/elements/text'
import { Button } from '~/ui/elements/button'
import { Link } from '~/ui/elements/link'
import { Break } from '~/ui/elements/break'
import { Loader } from '~/ui/elements/loader'
import { animationClassName } from '~/ui/styles'

import styles from './widget.styl'

type Props = {
  title?: string
  description?: string
  descriptionAddition?: string
  descriptionLink?: string
  button?: string
  link?: string
  loading?: boolean
  error?: boolean
  popup?: boolean
  onClick?: () => void
  onClose?: () => void
}

export const Widget: FC<Props> = memo(({
  title,
  description,
  descriptionAddition,
  descriptionLink,
  button,
  link,
  loading,
  error,
  popup,
  onClick,
  onClose
}) => {
  const widgetRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<Animation|undefined>()
  const isPerformance = useMemo(() => checkIsIOS(), [])

  const close = useCallback(() => {
    if (!onClose) return
    animationRef.current?.reverse()
    setTimeout(() => onClose?.(), 200)
  }, [onClose])

  const handleClick = useCallback(() => {
    onClick?.()
    close()
  }, [onClick, close])

  useEffect(() => {
    animationRef.current = widgetRef.current?.animate?.([
      { transform: 'translateY(40px)', opacity: 0 },
      { transform: 'translateY(0)', opacity: 1 },
    ], {
      duration: 200,
      fill: 'forwards',
      easing: 'ease-in-out'
    })
  }, [])

  return (
    <div
      class={cn(
        styles.root,
        styles[animationClassName],
        isPerformance && styles._performance,
        error && styles._error,
        popup && styles._popup
      )}
      ref={widgetRef}
    >
      <div class={styles.header}>
        {title}
      </div>

      {description && (
        <Fragment>
          <Text class={styles.description} withLink>
            {description} {descriptionLink && (
              <a
                href={descriptionLink}
                target="_blank"
                rel="noopener noreferrer"
              >{descriptionAddition}</a>
            )}
          </Text>
          <Break size={20} px/>
        </Fragment>
      )}

      {(button || loading) && (
        <Fragment>
          {loading ? (
            <Loader brand big/>
          ) : link ? (
            <Link
              class={styles.button}
              href={link}
              brand={!error}
              outline
              uppercase
              onClick={handleClick}
            >
              {button}
            </Link>
          ) : (
            <Button
              class={styles.button}
              brand={!error}
              outline
              uppercase
              onClick={handleClick}
            >
              {button}
            </Button>
          )}
          <Break size={20} px/>
        </Fragment>
      )}

      {onClose && (
        <Button
          class={styles.closeButton}
          icon="cross"
          square
          onClick={close}
        />
      )}
    </div>
  )
})
