import type { FunctionComponent as FC, RefObject } from 'preact'
import { h, Fragment } from 'preact'
import { memo, createPortal } from 'preact/compat'

import type { User } from '~/core/store'
import { checkIsStandalone } from '~/tools/detect-standalone'
import { getOS, getBrowser } from '~/tools/detect-platform'

type Props = {
  userRef: RefObject<User>
}

const bodyEl = self.document.body

export const Analytics: FC<Props> = memo(({
  userRef
}) => {
  return process.env.GOOGLE_ANALYTICS_ID ? createPortal((
    <Fragment>
      <script
        src={`/proxy/tag/${process.env.GOOGLE_ANALYTICS_ID}`}
        async
      ></script>
      <script dangerouslySetInnerHTML={{ __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${process.env.GOOGLE_ANALYTICS_ID}', {
          transport_url: 'https://${self.location.hostname}/proxy/event',
          anonymize_ip: true,
          country: '${userRef.current?.country || 'unknown'}',
          lang: '${self.navigator.language}',
          device: '${self.navigator.userAgent}',
          os: '${getOS()}',
          browser: '${getBrowser()}',
          authenticated: ${!!userRef.current},
          installed: ${checkIsStandalone()},
        });
      `}}>
      </script>
    </Fragment>
  ), bodyEl) : null
})
