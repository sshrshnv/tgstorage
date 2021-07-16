import { wrap } from 'comlink'

import type { WorkerTools } from './worker-tools.types'
import ToolsWorker from './tools.worker.ts'

const uiToolsWorker = new ToolsWorker();
(self as any)._uitw = uiToolsWorker

const workerTools: WorkerTools = wrap(uiToolsWorker)

export { workerTools }
