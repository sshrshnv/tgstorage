import { store } from '~/core/store'
import { sendAppError } from '~/core/actions'
import { checkIsIOSSafari } from '~/tools/detect-device'
import { checkIsStandalone } from '~/tools/detect-standalone'
import { timer } from '~/tools/timer'

let appInstallEvent
export const setAppInstallEvent = (ev) => {
  appInstallEvent = ev
  setAppInstallAvailable(true)
}

export const setAppInstallAvailable = (value: boolean) => {
  store.setState({
    appInstallAvailable: value
  })
}

export const setAppInstalled = (value: boolean) => {
  store.setState({
    appInstalled: value
  })
}

export const installApp = async () => {
  if (checkIsIOSSafari()) {
    self.document.dispatchEvent(new CustomEvent('install'))
    return
  }

  try {
    appInstallEvent.prompt()
    const { outcome } = await appInstallEvent.userChoice
    const isAppInstalled = outcome === 'accepted'
    setAppInstalled(isAppInstalled)
    return isAppInstalled
  } catch(error) {
    sendAppError(error)
  }
}

export const listenAppInstall = async () => {
  self.addEventListener('load', () => {
    self.addEventListener('beforeinstallprompt', (ev) => {
      ev.preventDefault()
      setAppInstallEvent(ev)
    })
    self.addEventListener('appinstalled', () => setAppInstalled(true))
  })

  if (checkIsIOSSafari() && !checkIsStandalone()) {
    await timer(10000)
    setAppInstallAvailable(true)
  }
}
