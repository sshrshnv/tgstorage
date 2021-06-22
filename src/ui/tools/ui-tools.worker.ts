import { expose } from 'comlink'
import { imageDataRGB } from 'stackblur-canvas'

const uiTools = {
  processImageDataRGB(...params: Parameters<typeof imageDataRGB>) {
    return imageDataRGB(...params)
  }
}

expose(uiTools)
