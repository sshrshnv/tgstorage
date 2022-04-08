import type { FunctionComponent as FC } from 'preact'
import { h } from 'preact'
import { Suspense, lazy } from 'preact/compat'

import { getLang, setTexts } from '~/core/actions'
import { Fallback } from '~/ui/elements/fallback'

const Intro = lazy(async () => {
  const lang = getLang()
  const [module, texts] = await Promise.all([
    import('./intro'),
    import(`~/texts/${lang}/texts.intro.json`)
  ])
  setTexts(lang, { intro: texts.default })
  return module
})

export const IntroLazy: FC = () => {
  return (
    <Suspense fallback={<Fallback/>}>
      <Intro/>
    </Suspense>
  )
}
