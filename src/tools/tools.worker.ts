import { expose } from 'comlink'
import { imageDataRGB } from 'stackblur-canvas'

const ToolsWorker = {
  getBluredImageData: (...params: Parameters<typeof imageDataRGB>) => imageDataRGB(...params)
}

expose(ToolsWorker)
