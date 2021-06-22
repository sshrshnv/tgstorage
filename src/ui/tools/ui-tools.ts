import { wrap } from 'comlink'

import type { UITools } from './ui-tools.types'
import UIToolsWorker from './ui-tools.worker.ts'

const uiToolsWorker = new UIToolsWorker();
(self as any)._uitw = uiToolsWorker

const uiTools: UITools = wrap(uiToolsWorker)

export { uiTools }
