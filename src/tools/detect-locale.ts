export const AVALIABLE_LOCALES = ['en', 'es', 'ru', 'zhTW'] as const
export const EXACT_LOCALES = ['zh']
export const CIS = ['ru', 'ua', 'by', 'ge', 'az', 'kz', 'uz', 'tj', 'kg']
export const FALLBACK_LOCALE= 'en' as const

export type AvailableLocales = typeof AVALIABLE_LOCALES[number]

export const detectLocale = (): AvailableLocales => {
  let locale = self.navigator.language.slice(0, 2) as AvailableLocales

  if (EXACT_LOCALES.includes(locale)) {
    locale = self.navigator.language.replace('-', '') as AvailableLocales
  }

  return (
    AVALIABLE_LOCALES.includes(locale) ? locale :
      CIS.includes(locale) ? 'ru' :
        FALLBACK_LOCALE
  )
}
