import type { FunctionComponent as FC } from 'preact'
import { h } from 'preact'
import { Suspense, lazy } from 'preact/compat'

import { getLocale, setTexts } from '~/core/actions'

const Widgets = lazy(async () => {
  const locale = getLocale()
  const [module, texts] = await Promise.all([
    import('./widgets'),
    import(`./widgets.texts.${locale}.json`)
  ])
  setTexts(locale, { widgets: texts.default })
  return module
})

export const WidgetsLazy: FC = () => {
  return (
    <Suspense fallback={null}>
      <Widgets/>
    </Suspense>
  )
}
