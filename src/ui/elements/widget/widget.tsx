import type { FunctionComponent as FC } from 'preact'
import { h, Fragment } from 'preact'
import { memo } from 'preact/compat'
import { useCallback, useMemo, useEffect, useRef } from 'preact/hooks'
import cn from 'classnames'

import { checkIsIOS } from '~/tools/detect-device'
import { Text } from '~/ui/elements/text'
import { Button } from '~/ui/elements/button'
import { Break } from '~/ui/elements/break'
import { Loader } from '~/ui/elements/loader'
import { CrossIcon } from '~/ui/icons'
import { animationClassName } from '~/ui/styles'

import styles from './widget.styl'

type Props = {
  title?: string
  description?: string
  button?: string
  loading?: boolean
  error?: boolean
  onClick?: () => void
  onClose?: () => void
}

export const Widget: FC<Props> = memo(({
  title,
  description,
  button,
  loading,
  error,
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
        error && styles._error
      )}
      ref={widgetRef}
    >
      <div class={styles.header}>
        {title}
      </div>

      {description && (
        <Fragment>
          <Text class={styles.description}>
            {description}
          </Text>
          <Break size={20} px/>
        </Fragment>
      )}

      {(button || loading) && (
        <Fragment>
          {loading ? (
            <Loader brand big/>
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
          icon={<CrossIcon/>}
          square
          onClick={close}
        />
      )}
    </div>
  )
})
