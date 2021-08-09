import type { RefObject } from 'preact'

import { workerTools } from '~/tools/worker-tools'

export const blurImage = ({
  url,
  canvasRef,
  width,
  height,
  radius
}: {
  url: string
  canvasRef: RefObject<HTMLCanvasElement>
  width: number
  height: number
  radius: number
}) => {
  const canvas = canvasRef.current
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
    const bluredImageData = await workerTools.getBluredImageData(imageData, ...canvasParams, radius)
    canvasContext.putImageData(bluredImageData, 0, 0)
  }
  image.src = url
}
