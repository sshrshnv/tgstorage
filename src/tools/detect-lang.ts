const importLangNames = r =>
  r.keys().reduce((obj, key) => ({ ...obj, [key.split('/')[1]]: r(key) }), {})

export type Langs = string[]
export type LangName = Record<'name', string>
export type LangNames = Record<string, LangName>

export const LANG_NAMES: LangNames = importLangNames(require.context('~/texts/', true, /lang\.json$/))
export const LANGS: Langs = Object.keys(LANG_NAMES)
export const EXACT_LANGS = [...new Set(LANGS.filter(lang => lang.length > 2).map(lang => lang.slice(0, 2)))]
export const FALLBACK_LANG= 'en'

export const detectLang = () => {
  let lang = self.navigator.language.slice(0, 2)

  if (EXACT_LANGS.includes(lang)) {
    lang = self.navigator.language.replace('-', '')
  }

  return LANGS.includes(lang) ? lang : FALLBACK_LANG
}
