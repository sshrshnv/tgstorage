declare const self: ServiceWorkerGlobalScope

const [wb, actions] = await Promise.all([
  import('./sw.runtime'),
  import('./actions')
])

if (process.env.NODE_ENV === 'production') {
  wb.setCacheNameDetails({ prefix: 'tgstorage' })

  self.addEventListener('message', ev => {
    if (ev.data?.type === 'SKIP_WAITING') {
      self.skipWaiting()
    }
  })

  wb.clientsClaim()
  wb.precacheAndRoute(self.__WB_MANIFEST)
  wb.cleanupOutdatedCaches()

  wb.registerRoute(
    new wb.NavigationRoute(
      wb.createHandlerBoundToURL('/index.html'),
      { allowlist: [/^(?!\/__)/] }
    )
  )
}

wb.registerRoute(
  ({ request }) => request.url.startsWith('/sw/stream/'),
  actions.stream
)

export {}
