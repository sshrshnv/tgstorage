import type { FunctionComponent as FC } from 'preact'
import { h } from 'preact'
import { Suspense, lazy } from 'preact/compat'

import { FallbackQRCode } from './qrcode.fallback'

type Props = {
  link: string
}

const QRCode = lazy(async () => {
  const [module] = await Promise.all([
    import('./qrcode')
  ])
  return module
})

export const QRCodeLazy: FC<Props> = (props) => {
  return (
    <Suspense fallback={<FallbackQRCode/>}>
      <QRCode {...props}/>
    </Suspense>
  )
}
