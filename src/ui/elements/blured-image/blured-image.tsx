import type { FunctionComponent as FC } from 'preact'
import { h } from 'preact'
import { memo } from 'preact/compat'
import { useRef, useEffect } from 'preact/hooks'

import { useUpdatableRef } from '~/tools/hooks'
import { blurImage } from '~/tools/blur-image'

type Props = {
  url: string
  width: number
  height: number
  radius: number
}

export const BluredImage: FC<Props> = memo(({
  url,
  width,
  height,
  radius
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const widthRef = useUpdatableRef(width)
  const heightRef = useUpdatableRef(height)
  const radiusRef = useUpdatableRef(radius)

  useEffect(() => {
    if (!url) return
    blurImage({
      url,
      canvasRef,
      width: widthRef.current,
      height: heightRef.current,
      radius: radiusRef.current
    })
  }, [url])

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
    />
  )
})
