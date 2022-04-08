import type { FunctionComponent as FC } from 'preact'
import { h } from 'preact'
import { Suspense, lazy } from 'preact/compat'

import { getLang, setTexts } from '~/core/actions'

const Widgets = lazy(async () => {
  const lang = getLang()
  const [module, texts] = await Promise.all([
    import('./widgets'),
    import(`~/texts/${lang}/texts.widgets.json`)
  ])
  setTexts(lang, { widgets: texts.default })
  return module
})

export const WidgetsLazy: FC = () => {
  return (
    <Suspense fallback={null}>
      <Widgets/>
    </Suspense>
  )
}
