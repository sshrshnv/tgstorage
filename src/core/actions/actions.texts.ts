import type { Lang, Texts } from '~/core/store'
import { store } from '~/core/store'
import { checkIsIOS } from '~/tools/detect-platform'
import { TEXT_MODULE_NAMES } from '~/texts'

const loadedTexts = {}

export const loadTexts = async (
  lang: Lang
) => {
  let texts = loadedTexts[lang]

  if (!texts) {
    const textModules = await Promise.all(TEXT_MODULE_NAMES.map(name => {
      let subName = ''
      if (name === 'platform') {
        if (checkIsIOS()) {
          subName = '.ios'
        } else {
          return { default: {} }
        }
      }
      return import(`~/texts/${lang}/texts.${name}${subName}.json`)
    }))

    texts = {}
    TEXT_MODULE_NAMES.forEach((name, index) => {
      texts[name] = textModules[index]
    })

    loadedTexts[lang] = texts
  }

  setTexts(lang, texts)
}

export const setTexts = (
  lang: Lang,
  texts: Texts[Lang]
) => {
  const storeTexts = store.getState().texts
  store.setState({
    texts: {
      ...storeTexts,
      [lang]: {
        ...storeTexts[lang],
        ...texts
      }
    }
  })
}
