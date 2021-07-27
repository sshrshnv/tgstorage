import { Workbox } from 'workbox-window'

import {
  setAppUpdateExist,
  waitAppUpdateAccepted,
  downloadStreamFilePart
} from '~/core/actions'
import {
  checkIsSafari
} from '~/tools/detect-device'

let registration

export const registerSW = async () => {
  if (!('serviceWorker' in navigator)) return

  const wb = new Workbox('/sw.js')

  const update = () => {
    wb.addEventListener('controlling', () => {
      self.location.reload()
    })
    wb.messageSkipWaiting()
  }

  wb.addEventListener('waiting', () => {
    if (process.env.NODE_ENV === 'production') {
      waitAppUpdateAccepted(update)
      setAppUpdateExist()
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
  })

  registration = await wb.register()
}

export const checkIsSWRegistered = () =>
  !!registration
