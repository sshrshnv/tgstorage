import type { FunctionComponent as FC, RefObject } from 'preact'
import { h, Fragment } from 'preact'
import { memo, createPortal } from 'preact/compat'
import { useCallback } from 'preact/hooks'

import type { User } from '~/core/store'
import { useStateRef } from '~/tools/hooks'
import { checkIsStandalone } from '~/tools/detect-standalone'
import { getOS, getBrowser } from '~/tools/detect-platform'

type Props = {
  userRef: RefObject<User>
}

const bodyEl = self.document.body

export const Analytics: FC<Props> = memo(({
  userRef
}) => {
  const [proxied, _setProxied, proxiedRef, setProxiedRef] = useStateRef(false)
  const [loaded, _setLoaded, _loadedRef, setLoadedRef] = useStateRef(false)

  const handleLoad = useCallback(async () => {
    if (proxiedRef.current) return
    await self.fetch?.('https://www.google-analytics.com/g/collect', {
      'credentials': 'omit',
      'headers': {
        'Accept': '*/*',
        'Accept-Language': 'en-US,en;q=0.5'
      },
      'method': 'POST',
      'mode': 'cors'
    }).then(() => {
      setLoadedRef.current?.(true)
    }).catch(() => {
      setProxiedRef.current?.(true)
    })
  }, [])

  const handleError = useCallback(() => {
    if (proxiedRef.current) return
    setProxiedRef.current?.(true)
  }, [])

  return process.env.GOOGLE_ANALYTICS_ID ? createPortal((
    <Fragment>
      <script
        src={proxied ?
          `/proxy/tag/${process.env.GOOGLE_ANALYTICS_ID}` :
          `https://www.googletagmanager.com/gtag/js?id=${process.env.GOOGLE_ANALYTICS_ID}`
        }
        async
        onLoad={handleLoad}
        onError={handleError}
      ></script>
      {(loaded || proxied) && (
        <script
          dangerouslySetInnerHTML={{ __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.GOOGLE_ANALYTICS_ID}', {
              ${proxied ? `transport_url: 'https://${self.location.hostname}/proxy/event',` : ''}
              anonymize_ip: true,
              country: '${userRef.current?.country || 'unknown'}',
              lang: '${self.navigator.language}',
              device: '${self.navigator.userAgent}',
              os: '${getOS()}',
              browser: '${getBrowser()}',
              authenticated: ${!!userRef.current},
              installed: ${checkIsStandalone()},
              proxied: ${proxied}
            });
          `}}
        ></script>
      )}
    </Fragment>
  ), bodyEl) : null
})
