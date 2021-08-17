type NavigatorExtended = Navigator & {
  standalone: boolean
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
  isIOS ??= (/ipad|iphone|ipod/i.test(platform) || (/mac/i.test(platform) && maxTouchPoints > 1)) && !self.MSStream

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
  isAndroid ??= (/android/i.test(platform) || /android/i.test(userAgent)) && !self.MSStream

let isChrome
const checkIsChrome = () =>
  isChrome ??= brands ?
    brands.some(({ brand }) => brand.toLocaleLowerCase() === 'chromium') :
    !!(window as any).chrome && /chrome/.test(userAgent)

let isAndroidChrome
export const checkIsAndroidChrome = () =>
  isAndroidChrome ??= checkIsAndroid() && checkIsChrome()

let isDesktop
export const checkIsDesktop = () =>
  isDesktop ??= !checkIsIOS() && !checkIsAndroid()

let isDesktopChrome
export const checkIsDesktopChrome = () =>
  isDesktopChrome ??= checkIsDesktop() && checkIsChrome()

let chromiumVersion
export const getChromiumVersion = () =>
  chromiumVersion ??= +(brands?.find(({ brand }) => brand.toLocaleLowerCase() === 'chromium')?.version || '')

let isInstalled
export const checkIsInstalled = () =>
  isInstalled ??= navigator.standalone || matchMedia('(display-mode: standalone)').matches
