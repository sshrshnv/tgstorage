import { wrap } from 'comlink'

import type { UIWorkerTools } from './ui-tools.types'
import UIToolsWorker from './ui-tools.worker.ts'
import { processImageFile } from './process-image-file'
import { processVideoFile } from './process-video-file'

const uiToolsWorker = new UIToolsWorker();
(self as any)._uitw = uiToolsWorker

const uiWorkerTools: UIWorkerTools = wrap(uiToolsWorker)

const uiTools = {
  processImageFile,
  processVideoFile
}

export { uiTools, uiWorkerTools }
