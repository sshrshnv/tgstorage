import { Workbox } from 'workbox-window'

import {
  setAppUpdateExists,
  waitAppUpdateAccepted,
  downloadStreamFilePart,
  setSharedData
} from '~/core/actions'
import { setFile, resetQueryCache } from '~/core/cache'
import { checkIsSafari } from '~/tools/detect-platform'

let registration: ServiceWorkerRegistration | undefined

export const registerSW = async () => {
  if (!('serviceWorker' in navigator)) return

  const wb = new Workbox('/sw.js')

  const update = () => {
    wb.addEventListener('controlling', async () => {
      try {
        await resetQueryCache()
      } catch (err) {}
      self.location.reload()
    })
    wb.messageSkipWaiting()
  }

  wb.addEventListener('waiting', () => {
    if (process.env.NODE_ENV === 'production') {
      waitAppUpdateAccepted(update)
      setAppUpdateExists()
    } else {
      update()
    }
  })

  wb.addEventListener('message', async ev => {
    const { sw, data } = ev
    const { type, messageKey, params } = data

    if (type === 'downloadStreamFilePart') {
      const bytes = await downloadStreamFilePart(params)

      if (bytes) {
        sw?.postMessage({
          ...params,
          isSafari: checkIsSafari(),
          messageKey,
          bytes
        }, [bytes.buffer])
      } else {
        sw?.postMessage({
          messageKey
        })
      }
    }

    if (type === 'receiveSharedData') {
      const { text, files } = params
      const fileKeys = files.map(file => setFile(file))
      setSharedData({
        text,
        fileKeys
      })
    }
  })

  registration = await wb.register()

  if (self.location.search === '?share') {
    self.history.replaceState('', '', self.location.pathname.replace('?share', ''))
    wb.messageSW({ messageKey: 'share-ready' })
  }
}

export const unregisterSW = () =>
  registration?.unregister()

export const checkIsSWRegistered = () =>
  !!registration
