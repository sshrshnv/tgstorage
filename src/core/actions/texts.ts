import type { Locale, Texts } from '~/core/store'
import { store } from '~/core/store'

const loadedTexts = {}

export const loadTexts = async (
  locale: Locale
) => {
  let texts = loadedTexts[locale]

  if (!texts) {
    const [app, intro, auth, storage] = await Promise.all([
      import(`~/core/app.texts.${locale}.json`),
      import(`~/features/intro/intro.texts.${locale}.json`),
      import(`~/features/auth/auth.texts.${locale}.json`),
      import(`~/features/storage/storage.texts.${locale}.json`),
    ])

    texts = {
      app: app.default,
      intro: intro.default,
      auth: auth.default,
      storage: storage.default
    }

    loadedTexts[locale] = texts
  }

  setTexts(locale, texts)
}

export const setTexts = (
  locale: Locale,
  texts: Texts[Locale]
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
