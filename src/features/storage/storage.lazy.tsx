import { h } from 'preact'
import { Suspense, lazy } from 'preact/compat'
import type { FunctionComponent as FC } from 'preact'

import {  getLocale, setTexts } from '~/core/actions'
import { Fallback } from '~/ui/elements/fallback'

const Storage = lazy(async () => {
  const locale = getLocale()
  const [module, texts] = await Promise.all([
    import('./storage'),
    import(`./storage.texts.${locale}.json`)
  ])
  setTexts(locale, { storage: texts.default })
  return module
})

export const StorageLazy: FC = () => {
  return (
    <Suspense fallback={<Fallback/>}>
      <Storage/>
    </Suspense>
  )
}
