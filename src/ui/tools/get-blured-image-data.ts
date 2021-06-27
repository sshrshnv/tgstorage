import { imageDataRGB } from 'stackblur-canvas'

export const getBluredImageData = (...params: Parameters<typeof imageDataRGB>) =>
  imageDataRGB(...params)
