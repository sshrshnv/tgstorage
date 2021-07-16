import { imageDataRGB } from 'stackblur-canvas'

export const processBluredImageData = (...params: Parameters<typeof imageDataRGB>) =>
  imageDataRGB(...params)
