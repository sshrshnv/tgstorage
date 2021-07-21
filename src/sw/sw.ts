declare const self: ServiceWorkerGlobalScope

import { wb } from './workbox'
import { getMessageHandler, handleStream } from './handlers'

wb.setCacheNameDetails({ prefix: 'tgstorage' })

self.addEventListener('message', ev => {
  const { data } = ev

  if (data?.type === 'SKIP_WAITING') {
    self.skipWaiting()
  } else if (data?.messageKey) {
    getMessageHandler(data.messageKey)?.(data)
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
  new RegExp('/sw/stream'),
  handleStream
)

export {}
