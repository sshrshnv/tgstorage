import { expose } from 'comlink'

import { getBluredImageData } from './get-blured-image-data'

const uiWorkerTools = {
  getBluredImageData
}

expose(uiWorkerTools)
