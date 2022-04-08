import type { FunctionComponent as FC } from 'preact'
import { h } from 'preact'
import { Suspense, lazy } from 'preact/compat'

import { getLang, setTexts } from '~/core/actions'
import { FallbackSidebar } from '~/ui/elements/fallback-sidebar'

const Storage = lazy(async () => {
  const lang = getLang()
  const [module, texts] = await Promise.all([
    import('./storage'),
    import(`~/texts/${lang}/texts.storage.json`)
  ])
  setTexts(lang, { storage: texts.default })
  return module
})

export const StorageLazy: FC = () => {
  return (
    <Suspense fallback={<FallbackSidebar/>}>
      <Storage/>
    </Suspense>
  )
}
