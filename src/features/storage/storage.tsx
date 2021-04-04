import { h } from 'preact'
import type { FunctionComponent as FC } from 'preact'

import { Layout } from '~/ui/elements/layout'

import { StorageSidebar } from './storage.sidebar'
import { StorageContent } from './storage.content'

const Storage: FC = () => {
  return (
    <Layout>
      <StorageSidebar/>
      <StorageContent/>
    </Layout>
  )
}

export default Storage
