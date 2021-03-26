import { h } from 'preact'
import type { FunctionComponent as FC } from 'preact'

import { useUser } from '~/core/hooks'
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

/*
import { setUser } from '~/core/actions'
import { api } from '~/api'

<div onClick={() => {
  api.logOut().then(() => {
    setUser(null)
  })
}}>LogOut</div>
*/
