import type { FunctionComponent as FC } from 'preact'
import { h } from 'preact'
import { Suspense, lazy } from 'preact/compat'

const IOSInstallPrompt = lazy(async () => {
  const [module] = await Promise.all([
    import('./ios-install-prompt')
  ])
  return module
})

export const IOSInstallPromptLazy: FC = () => {
  return (
    <Suspense fallback={null}>
      <IOSInstallPrompt/>
    </Suspense>
  )
}
