import type { FunctionComponent as FC, RefObject } from 'preact'
import { h, Fragment } from 'preact'
import { memo, createPortal } from 'preact/compat'
import { useCallback, useEffect } from 'preact/hooks'

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
  const [tagProxied, _setTagProxied, tagProxiedRef, setTagProxiedRef] = useStateRef(false)
  const [eventProxied, _setEventProxied, _eventProxiedRef, setEventProxiedRef] = useStateRef(false)
  const [eventAllowed, _setEventAllowed, _eventAllowedRef, setEventAllowedRef] = useStateRef(false)

  useEffect(() => {
    if (!process.env.GOOGLE_ANALYTICS_ID) return

    self.fetch?.('https://www.google-analytics.com/g/collect', {
      'credentials': 'omit',
      'headers': {
        'Accept': '*/*'
      },
      'method': 'POST',
      'mode': 'cors'
    }).then(() => {
      setEventAllowedRef.current?.(true)
    }).catch(() => {
      setEventProxiedRef.current?.(true)
    })
  }, [])

  const handleTagError = useCallback(() => {
    if (tagProxiedRef.current) return
    setTagProxiedRef.current?.(true)
  }, [])

  return process.env.GOOGLE_ANALYTICS_ID ? createPortal((
    <Fragment>
      <script
        key={tagProxied ? 'proxied' : 'allowed'}
        src={tagProxied ?
          `/proxy/tag/${process.env.GOOGLE_ANALYTICS_ID}` :
          `https://www.googletagmanager.com/gtag/js?id=${process.env.GOOGLE_ANALYTICS_ID}`
        }
        async
        onError={handleTagError}
      ></script>
      {(eventAllowed || eventProxied) && (
        <script
          dangerouslySetInnerHTML={{ __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.GOOGLE_ANALYTICS_ID}', {
              ${eventProxied ? `transport_url: 'https://${self.location.hostname}/proxy/event',` : ''}
              anonymize_ip: true,
              country: '${userRef.current?.country || 'unknown'}',
              lang: '${self.navigator.language}',
              device: '${self.navigator.userAgent}',
              os: '${getOS()}',
              browser: '${getBrowser()}',
              authenticated: ${!!userRef.current},
              installed: ${checkIsStandalone()},
              proxied: ${eventProxied}
            });
          `}}
        ></script>
      )}
    </Fragment>
  ), bodyEl) : null
})
