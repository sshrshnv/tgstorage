import { setCacheNameDetails, clientsClaim } from 'workbox-core'
import { precacheAndRoute, cleanupOutdatedCaches, createHandlerBoundToURL } from 'workbox-precaching'
import { NavigationRoute, registerRoute } from 'workbox-routing'

export const wb = {
  setCacheNameDetails, clientsClaim,
  precacheAndRoute, cleanupOutdatedCaches, createHandlerBoundToURL,
  NavigationRoute, registerRoute
}
