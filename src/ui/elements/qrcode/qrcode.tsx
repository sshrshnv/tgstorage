import type { FunctionComponent as FC } from 'preact'
import { h } from 'preact'
import { memo } from 'preact/compat'
import { useEffect } from 'preact/hooks'
import { toString } from 'qrcode'

import { useStateRef } from '~/tools/hooks'

import { FallbackQRCode } from './qrcode.fallback'
import styles from './qrcode.styl'

type Props = {
  link: string
}

const QRCode: FC<Props> = memo(({
  link
}) => {
  const [codeSVG, _setCodeSVG, _codeSVGRef, setCodeSVGRef] = useStateRef(link)

  useEffect(() => {
    toString(link, {
      errorCorrectionLevel: 'Q',
      margin: 0,
      scale: 1
    }, (err, svg) => {
      setCodeSVGRef.current?.(err ? `https://${process.env.DOMAIN}` : svg)
    })
  }, [link])

  return codeSVG ? (
    <div
      class={styles.root}
      dangerouslySetInnerHTML={{ __html: codeSVG }}
    />
  ) : (
    <FallbackQRCode/>
  )
})

export default QRCode
