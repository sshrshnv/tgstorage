const AVALIABLE_LOCALES = ['en', 'ru']
const FALLBACK_LOCALE = 'en'

export const detectLocale = (): string => {
  const locale = window.navigator.language.slice(0,2)
  return AVALIABLE_LOCALES.includes(locale) ? locale : FALLBACK_LOCALE
}
