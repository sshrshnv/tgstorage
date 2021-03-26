import { h } from 'preact'
import { Suspense, lazy } from 'preact/compat'
import type { FunctionComponent as FC } from 'preact'

import { setTexts } from '~/core/actions'
import { detectLocale } from '~/tools/detect-locale'
import { Fallback } from '~/ui/elements/fallback'

const Storage = lazy(async () => {
  const [module, texts] = await Promise.all([
    import('./storage'),
    import(`./storage.texts.${detectLocale()}.json`)
  ])
  setTexts({ storage: texts.default })
  return module
})

export const StorageLazy: FC = () => {
  return (
    <Suspense fallback={<Fallback/>}>
      <Storage/>
    </Suspense>
  )
}
