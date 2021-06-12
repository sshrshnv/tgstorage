import { wrap, proxy } from 'comlink'

import type { Api as ApiInstance } from './api.types'
import ApiWorker from './api.worker.ts'

const apiWorker = new ApiWorker();
(self as any)._aw = apiWorker

const Api: any = wrap(apiWorker)
const api: ApiInstance = await new Api()

await api.init()

//const listenUpdates = (handler: (message: any) => void) =>
//  api.listenUpdates(proxy(handler))

const listenUpdates = () => {
  //
}

export { api, listenUpdates }
