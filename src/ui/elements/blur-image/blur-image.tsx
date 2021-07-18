import type { FunctionComponent as FC } from 'preact'
import { h } from 'preact'
import { memo } from 'preact/compat'
import { useRef, useEffect, useCallback } from 'preact/hooks'
import rafSchedule from 'raf-schd'

import { workerTools } from '~/tools/worker-tools'

type Props = {
  url: string
  width: number
  height: number
  radius: number
}

export const BlurImage: FC<Props> = memo(({
  url,
  width,
  height,
  radius
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const blurImage = useCallback(rafSchedule((canvasRef, url) => {
    const canvas: HTMLCanvasElement = canvasRef.current
    const canvasContext = canvas?.getContext('2d')
    if (!canvasContext || !url) return

    const image = new Image()
    image.onload = async () => {
      const bufferCanvas = self.document.createElement('canvas')
      const bufferCanvasContext = bufferCanvas.getContext('2d', { alpha: false })
      if (!bufferCanvasContext) return

      const imageParams: [number, number, number, number] = [0, 0, image.naturalWidth, image.naturalHeight]
      const canvasParams: [number, number, number, number] = [0, 0, width, height]
      bufferCanvasContext.drawImage(image, ...imageParams, ...canvasParams)
      const imageData = bufferCanvasContext.getImageData(...canvasParams)
      const bluredImageData = await workerTools.processBluredImageData(imageData, ...canvasParams, radius)
      canvasContext.putImageData(bluredImageData, 0, 0)
    }
    image.src = url
  }), [])

  useEffect(() => {
    blurImage(canvasRef, url)
  }, [url])

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
    />
  )
})
