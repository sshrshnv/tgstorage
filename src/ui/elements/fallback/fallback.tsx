import type { FunctionComponent as FC } from 'preact'
import { h } from 'preact'

import { Layout } from '~/ui/elements/layout'
import { Break } from '~/ui/elements/break'
import { Logo } from '~/ui/elements/logo'
import { Loader } from '~/ui/elements/loader'

export const Fallback: FC = () => {
  return (
    <Layout center outer>
      <Break mSize={48} dSize={72} px/>
      <Logo/>
      <Break mSize={40} dSize={64} px/>
      <Loader brand big/>
      <Break mSize={48} dSize={72} px/>
    </Layout>
  )
}
