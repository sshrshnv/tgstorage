import type { FunctionComponent as FC } from 'preact'
import { h } from 'preact'
import { Suspense, lazy } from 'preact/compat'

import { getLang, setTexts } from '~/core/actions'
import { Fallback } from '~/ui/elements/fallback'

const Auth = lazy(async () => {
  const lang = getLang()
  const [module, texts] = await Promise.all([
    import('./auth'),
    import(`~/texts/${lang}/texts.auth.json`)
  ])
  setTexts(lang, { auth: texts.default })
  return module
})

export const AuthLazy: FC = () => {
  return (
    <Suspense fallback={<Fallback/>}>
      <Auth/>
    </Suspense>
  )
}
