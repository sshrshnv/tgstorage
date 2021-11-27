import type { FunctionComponent as FC } from 'preact'
import { h, Fragment } from 'preact'
import { memo, createPortal } from 'preact/compat'

const analyticsId = process.env.GOOGLE_ANALYTICS_ID
const bodyEl = self.document.body

export const Analytics: FC = memo(() => {
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
        gtag('config', '${analyticsId}');
      `}}>
      </script>
    </Fragment>
  ), bodyEl) : null
})
