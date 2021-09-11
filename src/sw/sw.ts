declare const self: ServiceWorkerGlobalScope

import { wb } from './workbox'
import {
  getMessageHandler, deleteMessageHandler,
  handleStream, handleSave, handleShare
} from './handlers'

const SW_STREAM_PATH = '/sw/stream'
const SW_SAVE_PATH = '/sw/save'
const SW_SHARE_PATH = '/sw/share'

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
    ({ request }) => /\.[0-9a-z]{8}\.(avif|webp|png|jpe?g)/.test(request.url),
    new wb.CacheFirst({
      cacheName: 'images',
      plugins: [
        new wb.ExpirationPlugin({
          maxAgeSeconds: 365 * 24 * 60 * 60
        })
      ]
    })
  )

  wb.registerRoute(
    new wb.NavigationRoute(
      wb.createHandlerBoundToURL('/index.html'),
      { allowlist: [/^(?!\/__)/] }
    )
  )
}

wb.registerRoute(
  new RegExp(SW_STREAM_PATH),
  handleStream
)

wb.registerRoute(
  new RegExp(SW_SAVE_PATH),
  handleSave,
  'POST'
)

wb.registerRoute(
  new RegExp(SW_SHARE_PATH),
  handleShare,
  'POST'
)

export {}
