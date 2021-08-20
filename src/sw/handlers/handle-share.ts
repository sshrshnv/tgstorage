declare const self: ServiceWorkerGlobalScope

import { addMessageHandler } from './handlers'

export const handleShare = ({
  event,
  request
}) => new Promise<Response>(async resolve => {
  const formData = await request.formData()
  const title = formData.get('title')
  const text = formData.get('text')
  const url = formData.get('url')
  const files = formData.getAll('files')

  addMessageHandler('share-ready', async () => {
    let client
    if (event.resultingClientId) {
      client = await self.clients.get(event.resultingClientId)
    } else {
      const clients = await self.clients.matchAll({ type: 'window', includeUncontrolled: false })
      client = clients.length === 1 ? clients[0] : clients.find(client => client.focused)
    }
    const params = {
      text: text || url || title,
      files
    }

    client.postMessage({
      type: 'receiveSharedData',
      params
    })
  })

  resolve(Response.redirect('/app?share', 303))
})
