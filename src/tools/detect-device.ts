type NavigatorExtended = Navigator & {
  userAgentData?: {
    brands?: { brand: string, version: string }[]
    platform?: string
    mobile?: boolean
  }
}

const navigator = self.navigator as NavigatorExtended
let { platform, userAgent, maxTouchPoints } = navigator
const { userAgentData = {} } = navigator
const { brands } = userAgentData

userAgent = userAgent.toLocaleLowerCase()
platform = platform?.toLowerCase() || userAgent
maxTouchPoints = maxTouchPoints || 1

let isIOS
export const checkIsIOS = () =>
  isIOS ??= (/ipad|iphone|ipod/i.test(platform) || (/mac/i.test(platform) && maxTouchPoints > 1)) && !(self as any).MSStream

let isSafari
export const checkIsSafari = () =>
  isSafari ??= !checkIsChrome() && /safari|mac/i.test(userAgent)

let isIOSSafari
export const checkIsIOSSafari = () =>
  isIOSSafari ??= checkIsIOS() && !checkIsIOSChrome() && /safari|mac/i.test(userAgent)

let isIOSChrome
export const checkIsIOSChrome = () =>
  isIOSChrome ??= checkIsIOS() && /crios/i.test(userAgent)

let isAndroid
export const checkIsAndroid = () =>
  isAndroid ??= (/android/i.test(platform) || /android/i.test(userAgent)) && !(self as any).MSStream

let isMicrosoftEdge
export const checkIsMicrosoftEdge = () =>
  isMicrosoftEdge ??= brands ?
    brands.some(({ brand }) => brand.toLocaleLowerCase() === 'microsoft edge') :
    /edg/i.test(userAgent)

let isYandex
export const checkIsYandex = () =>
  isYandex ??= /yabrowser/i.test(userAgent)

let isSamsung
export const checkIsSamsung = () =>
  isSamsung ??= /samsung/i.test(userAgent)

let isChrome
export const checkIsChrome = () =>
  isChrome ??= !checkIsMicrosoftEdge() && !checkIsYandex() && !checkIsSamsung() && (brands ?
    brands.some(({ brand }) => brand.toLocaleLowerCase() === 'chromium') :
    !!(window as any).chrome && /chrome/.test(userAgent)
  )

let isAndroidChrome
export const checkIsAndroidChrome = () =>
  isAndroidChrome ??= checkIsAndroid() && checkIsChrome()

let isWindows
export const checkIsWindows = () =>
  isWindows ??= (
    userAgentData.platform?.toLocaleLowerCase() === 'windows' ||
    /win/i.test(platform) || /windows/i.test(userAgent)
  )

let isMac
export const checkIsMac = () =>
  isMac ??= /mac/i.test(platform) || /mac/i.test(userAgent)

let isDesktop
export const checkIsDesktop = () =>
  isDesktop ??= !checkIsIOS() && !checkIsAndroid()

let isDesktopChrome
export const checkIsDesktopChrome = () =>
  isDesktopChrome ??= checkIsDesktop() && checkIsChrome()

let iosVersion
export const getIOSVersion = () =>
  iosVersion ??= +(userAgent.substr(userAgent.indexOf('OS ') + 3, 3).replace('_', '.') || '')

let chromiumVersion
export const getChromiumVersion = () =>
  chromiumVersion ??= +(brands?.find(({ brand }) => brand.toLocaleLowerCase() === 'chromium')?.version || '')
