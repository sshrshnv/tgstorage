import { h } from 'preact'
import { Suspense, lazy } from 'preact/compat'
import type { FunctionComponent as FC } from 'preact'

import { setTexts } from '~/core/actions'
import { detectLocale } from '~/tools/detect-locale'
import { Fallback } from '~/ui/elements/fallback'

const Auth = lazy(async () => {
  const [module, texts] = await Promise.all([
    import('./auth'),
    import(`./auth.texts.${detectLocale()}.json`)
  ])
  setTexts({ auth: texts.default })
  return module
})

export const AuthLazy: FC = () => {
  return (
    <Suspense fallback={<Fallback/>}>
      <Auth/>
    </Suspense>
  )
}
