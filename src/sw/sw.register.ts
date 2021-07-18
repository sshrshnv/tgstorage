import { Workbox } from 'workbox-window'

import { setAppUpdateExist, waitAppUpdateAccepted } from '~/core/actions'

let wb: Workbox
let registration

export const registerSW = async () => {
  if (!('serviceWorker' in navigator)) {
    wb = new Workbox('/sw.js')

    wb.addEventListener('waiting', () => {
      waitAppUpdateAccepted(() => {
        wb.addEventListener('controlling', () => {
          self.location.reload()
        })

        wb.messageSkipWaiting()
      })

      setAppUpdateExist()
    })

    registration = await wb.register()
  }
}

export const checkIsSWRegistered = () =>
  !!registration
