import type { FunctionComponent as FC } from 'preact'
import { h } from 'preact'
import { Suspense, lazy } from 'preact/compat'

import { getLang, setTexts } from '~/core/actions'
import { checkIsIOS } from '~/tools/detect-platform'

const Platform = lazy(async () => {
  const lang = getLang()
  let os = ''
  if (checkIsIOS()) {
    os = 'ios'
  }
  const [module, texts] = await Promise.all([
    import(`./${os}/platform`),
    import(`~/texts/${lang}/texts.platform.${os}.json`),
  ])
  setTexts(lang, { platform: texts.default })
  return module
})

export const PlatformLazy: FC = () => {
  if (!checkIsIOS()) {
    return null
  }

  return (
    <Suspense fallback={null}>
      <Platform/>
    </Suspense>
  )
}
