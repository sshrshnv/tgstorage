import type { FunctionComponent as FC } from 'preact'
import { h } from 'preact'
import { Suspense, lazy } from 'preact/compat'

import { getLocale, setTexts } from '~/core/actions'
import { Fallback } from '~/ui/elements/fallback'

const Intro = lazy(async () => {
  const locale = getLocale()
  const [module, texts] = await Promise.all([
    import('./intro'),
    import(`./intro.texts.${locale}.json`)
  ])
  setTexts(locale, { intro: texts.default })
  return module
})

export const IntroLazy: FC = () => {
  return (
    <Suspense fallback={<Fallback/>}>
      <Intro/>
    </Suspense>
  )
}
