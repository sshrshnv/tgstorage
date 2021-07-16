import { expose } from 'comlink'

import { processBluredImageData } from './process-blured-image-data'

const ToolsWorker = {
  processBluredImageData
}

expose(ToolsWorker)
