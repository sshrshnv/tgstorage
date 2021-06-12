export const AVALIABLE_LOCALES = ['en', 'ru'] as const
export const FALLBACK_LOCALE= 'en' as const

export type AvailableLocales = typeof AVALIABLE_LOCALES[number]

export const detectLocale = (): AvailableLocales => {
  const locale = self.navigator.language.slice(0,2) as AvailableLocales
  return AVALIABLE_LOCALES.includes(locale) ? locale : FALLBACK_LOCALE
}
