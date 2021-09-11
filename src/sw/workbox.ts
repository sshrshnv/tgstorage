import { setCacheNameDetails, clientsClaim } from 'workbox-core'
import { precacheAndRoute, cleanupOutdatedCaches, createHandlerBoundToURL } from 'workbox-precaching'
import { NavigationRoute, registerRoute } from 'workbox-routing'
import { CacheFirst } from 'workbox-strategies'
import { ExpirationPlugin } from 'workbox-expiration'

export const wb = {
  setCacheNameDetails, clientsClaim,
  precacheAndRoute, cleanupOutdatedCaches, createHandlerBoundToURL,
  NavigationRoute, registerRoute,
  CacheFirst, ExpirationPlugin
}
