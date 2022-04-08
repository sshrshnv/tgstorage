import type { FunctionComponent as FC } from 'preact'
import { h, Fragment } from 'preact'
import { memo } from 'preact/compat'

import { checkIsIOSSafari } from '~/tools/detect-platform'

import { PreventScroll } from './prevent-scroll'
import { InstallPrompt } from './install-prompt'

const Platform: FC = memo(() => {
  return (
    <Fragment>
      <PreventScroll/>
      {checkIsIOSSafari() && (
        <InstallPrompt/>
      )}
    </Fragment>
  )
})

export default Platform
