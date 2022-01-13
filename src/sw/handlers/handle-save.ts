declare const self: ServiceWorkerGlobalScope

import createSyncTaskQueue from 'sync-task-queue'

import { timer } from '~/tools/timer'

import { addMessageHandler } from './handlers'

const SAVE_PART_SIZE = 1024 * 1024
const SAVING_TIMEOUT = 400
const MAX_SAVING_COUNT = 2

const savingQueue = {
  nextIndex: 0,

  queues: [...Array(MAX_SAVING_COUNT).keys()].reduce((queue, index) => ({
    ...queue,
    [index]: createSyncTaskQueue()
  }), {}),

  add(fn) {
    const currentIndex = this.nextIndex
    this.queues[currentIndex].enqueue(async () => {
      await fn()
      return timer(SAVING_TIMEOUT)
    })
    this.nextIndex = currentIndex === MAX_SAVING_COUNT - 1 ? 0 : currentIndex + 1
  }
}

export const handleSave = ({
  url
}) => new Promise<Response>(async resolve => {
  const clients = await self.clients.matchAll({ type: 'window', includeUncontrolled: false })
  const client = clients.length === 1 ? clients[0] : clients.find(client => client.focused)
  if (!client) return

  const fileKey = url.searchParams.get('fileKey')
  const fileName = encodeURI(url.searchParams.get('fileName'))
  const fileSize = +url.searchParams.get('fileSize')
  const fileType = url.searchParams.get('fileType')
  const partSize = SAVE_PART_SIZE
  const partsCount = Math.ceil(fileSize / partSize)

  const stream = new ReadableStream({
    async start(controller: ReadableStreamDefaultController) {
      requestFile({
        client,
        controller,
        fileKey,
        fileSize,
        fileType,
        partsCount,
        partSize
      })
    }
  })

  resolve(new Response(stream, {
    headers: [
      ['Content-Disposition', `attachment; filename="${fileName}"`],
      ['Content-Length', `${fileSize}`],
      ['Content-Type', fileType]
    ]
  }))
})

const requestFile = ({
  client,
  controller,
  fileKey,
  fileSize,
  fileType,
  partsCount,
  partSize
}: {
  client: WindowClient
  controller: ReadableStreamDefaultController
  fileKey: string
  fileSize: number
  fileType: string
  partsCount: number
  partSize: number
}) => {
  savingQueue.add(async () => {
    for (let part = 0; part < partsCount; part++) {
      const offsetSize = part * partSize
      const isLastPart = part === partsCount - 1
      const params = { fileKey, fileSize, fileType, part, partSize, offsetSize }
      const messageKey = JSON.stringify(params)

      const messagePromise = new Promise(resolve => {
        addMessageHandler(messageKey, (data = {}) => {
          controller.enqueue(data.bytes)
          if (isLastPart) {
            controller.close()
          }
          data = undefined
          resolve(true)
        })
      })

      if ((controller?.desiredSize || 0) <= 0) {
        controller.close()
        return
      }

      client?.postMessage({
        type: 'downloadStreamFilePart',
        messageKey,
        params
      })

      await messagePromise
    }
  })
}
