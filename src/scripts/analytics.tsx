import type { FunctionComponent as FC, RefObject } from 'preact'
import { h, Fragment } from 'preact'
import { memo, createPortal } from 'preact/compat'

import type { User } from '~/core/store'
import { checkIsStandalone } from '~/tools/detect-standalone'

type Props = {
  userRef: RefObject<User>
}

const bodyEl = self.document.body
const analyticsId = process.env.GOOGLE_ANALYTICS_ID

export const Analytics: FC<Props> = memo(({
  userRef
}) => {
  return analyticsId ? createPortal((
    <Fragment>
      <script
        src={`https://www.googletagmanager.com/gtag/js?id=${analyticsId}`}
        async
      ></script>
      <script dangerouslySetInnerHTML={{ __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${analyticsId}', {
          auth: ${!!userRef.current},
          installation: ${checkIsStandalone()}
        });
      `}}>
      </script>
    </Fragment>
  ), bodyEl) : null
})
