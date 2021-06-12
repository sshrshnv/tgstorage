import type { Locales, Texts } from '~/core/store'
import { store } from '~/core/store'

export const getLocale = () =>
  store.getState().settings.locale

export const setTexts = (
  locale: Locales,
  texts: Texts[Locales]
) => {
  const storeTexts = store.getState().texts
  store.setState({
    texts: {
      ...storeTexts,
      [locale]: {
        ...storeTexts[locale],
        ...texts
      }
    }
  })
}
