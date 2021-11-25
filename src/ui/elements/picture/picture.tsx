import type { FunctionComponent as FC } from 'preact'
import { h } from 'preact'
import { memo } from 'preact/compat'
import { useMemo } from 'preact/hooks'
import cn from 'classnames'

import styles from './picture.styl'

type Props = {
  class?: string
  sources: {
    type: string
    src: string
  }[]
  alt?: string
}

export const Picture: FC<Props> = memo(({
  class: outerStyles,
  sources,
  alt = ''
}) => {
  const [imgSource, otherSources] = useMemo(() => {
    const imgSource = sources.find(({ type }) => ['png', 'jpg'].includes(type))
    const otherSources = sources.filter(({ type }) => !['png', 'jpg'].includes(type))
    return [imgSource, otherSources]
  }, [sources])

  return (
    <picture class={cn(
      outerStyles,
      styles.root
    )}>
      {otherSources.map(({ type, src }) => (
        <source
          key={type}
          srcSet={src}
          type={`image/${type}`}
        />
      ))}
      {!!imgSource && (
        <img
          src={imgSource.src}
          alt={alt}
          decoding="async"
          loading="lazy"
        />
      )}
    </picture>
  )
})
