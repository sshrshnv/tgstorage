type NavigatorExtended = Navigator & {
  standalone: boolean
}

const navigator = window.navigator as NavigatorExtended
let { platform, userAgent, maxTouchPoints } = navigator

userAgent = userAgent.toLocaleLowerCase()
platform = platform?.toLowerCase() || userAgent
maxTouchPoints = maxTouchPoints || 1

export const checkIsIOS = () => (
  /ipad|iphone|ipod/i.test(platform) ||
  (/mac/i.test(platform) && maxTouchPoints > 1)
) && !window.MSStream

export const checkIsSafari = () =>
  !checkIsChrome() && /safari|mac/i.test(userAgent)

export const checkIsIOSSafari = () =>
  checkIsIOS() && !checkIsIOSChrome() && /safari|mac/i.test(userAgent)

export const checkIsIOSChrome = () =>
  checkIsIOS() && /crios/i.test(userAgent)

export const checkIsAndroid = () => (
  /android/i.test(platform) || /android/i.test(userAgent)
) && !window.MSStream

export const checkIsAndroidChrome = () =>
  checkIsAndroid() && checkIsChrome()

export const checkIsChrome = () =>
  !!(window as any).chrome && /chrome/.test(userAgent)

export const checkIsDesktop = () =>
  !checkIsIOS() && !checkIsAndroid()

export const checkIsDesktopChrome = () =>
  checkIsDesktop() && checkIsChrome()

export const checkIsInstalled = () =>
  navigator.standalone || matchMedia('(display-mode: standalone)').matches
