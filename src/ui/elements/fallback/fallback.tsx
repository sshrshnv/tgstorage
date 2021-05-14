import { h } from 'preact'
import type { FunctionComponent as FC } from 'preact'

import { Layout } from '~/ui/elements/layout'
import { Break } from '~/ui/elements/break'
import { Logo } from '~/ui/elements/logo'
import { Loader } from '~/ui/elements/loader'

export const Fallback: FC = () => {
  return (
    <Layout center>
      <Break size={10} vh/>
      <Logo/>
      <Break size={10} vh/>
      <Loader/>
    </Layout>
  )
}
