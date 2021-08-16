declare const self: ServiceWorkerGlobalScope

import { wb } from './workbox'
import { getMessageHandler, deleteMessageHandler, handleStream } from './handlers'

const SW_STREAM_PATH = '/sw/stream'
//const SW_SAVE_PATH = '/sw/save'
//const SW_SHARE_PATH = '/sw/share'

wb.setCacheNameDetails({ prefix: 'tgstorage' })

self.addEventListener('message', ev => {
  const { data } = ev

  if (data?.type === 'SKIP_WAITING') {
    self.skipWaiting()
  } else if (data?.messageKey) {
    getMessageHandler(data.messageKey)?.(data)
    deleteMessageHandler(data.messageKey)
  }
})

wb.clientsClaim()

if (process.env.NODE_ENV === 'production') {
  wb.precacheAndRoute(self.__WB_MANIFEST)
  wb.cleanupOutdatedCaches()

  wb.registerRoute(
    new wb.NavigationRoute(
      wb.createHandlerBoundToURL('/index.html'),
      { allowlist: [/^(?!\/__)/] }
    )
  )
} else {
  self.skipWaiting()
}

wb.registerRoute(
  new RegExp(SW_STREAM_PATH),
  handleStream
)

export {}
