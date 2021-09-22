import { store } from '~/core/store'
import { sendAppError, setInstallWidget } from '~/core/actions'
import { timer } from '~/tools/timer'
import { checkIsStandalone } from '~/tools/detect-standalone'
import {
  checkIsDesktop, checkIsChrome, checkIsMicrosoftEdge,
  checkIsIOSSafari, checkIsAndroidChrome
} from '~/tools/detect-device'

let appInstallEvent
export const setAppInstallEvent = (ev) => {
  appInstallEvent = ev
  if ((checkIsDesktop() && (checkIsChrome() || checkIsMicrosoftEdge())) || checkIsAndroidChrome()) {
    setAppInstallAvailable(true)
  }
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
  } catch(error: any) {
    sendAppError(error)
  }
}

export const listenAppInstall = async () => {
  self.addEventListener('beforeinstallprompt', (ev) => {
    ev.preventDefault()
    setAppInstallEvent(ev)
  })
  self.addEventListener('appinstalled', () => setAppInstalled(true))

  if (checkIsIOSSafari() && !checkIsStandalone()) {
    await timer(10000)
    setAppInstallAvailable(true)
  }
}

export const cancelAppInstall = () => {
  setInstallWidget(false)
}
