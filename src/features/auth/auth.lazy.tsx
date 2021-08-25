import type { FunctionComponent as FC } from 'preact'
import { h } from 'preact'
import { Suspense, lazy } from 'preact/compat'

import { getLocale, setTexts } from '~/core/actions'
import { Fallback } from '~/ui/elements/fallback'

const Auth = lazy(async () => {
  const locale = getLocale()
  const [module, texts] = await Promise.all([
    import('./auth'),
    import(`./auth.texts.${locale}.json`)
  ])
  setTexts(locale, { auth: texts.default })
  return module
})

export const AuthLazy: FC = () => {
  return (
    <Suspense fallback={<Fallback/>}>
      <Auth/>
    </Suspense>
  )
}
