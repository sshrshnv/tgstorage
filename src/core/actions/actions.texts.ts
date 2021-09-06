import type { Locale, Texts } from '~/core/store'
import { store } from '~/core/store'

const loadedTexts = {}

export const loadTexts = async (
  locale: Locale
) => {
  let texts = loadedTexts[locale]

  if (!texts) {
    const [intro, auth, storage, widgets] = await Promise.all([
      import(`~/features/intro/intro.texts.${locale}.json`),
      import(`~/features/auth/auth.texts.${locale}.json`),
      import(`~/features/storage/storage.texts.${locale}.json`),
      import(`~/widgets/widgets.texts.${locale}.json`)
    ])

    texts = {
      intro: intro.default,
      auth: auth.default,
      storage: storage.default,
      widgets: widgets.default
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
