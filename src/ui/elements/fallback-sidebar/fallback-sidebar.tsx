import type { FunctionComponent as FC } from 'preact'
import { h } from 'preact'

import { Layout } from '~/ui/elements/layout'
import { SidebarWrapper } from '~/ui/elements/sidebar-wrapper'
import { Sidebar } from '~/ui/elements/sidebar'
import { SidebarHeader } from '~/ui/elements/sidebar-header'
import { SidebarActionButton } from '~/ui/elements/sidebar-action-button'
import { ContentWrapper } from '~/ui/elements/content-wrapper'
import { Button } from '~/ui/elements/button'
import { Loader } from '~/ui/elements/loader'
import { UserIcon, SettingsIcon } from '~/ui/icons'

export const FallbackSidebar: FC = () => {
  return (
    <Layout>
      <SidebarWrapper>
        <Sidebar>
          <SidebarHeader>
            <Button
              icon={<UserIcon/>}
              square
            />
            <Button
              icon={<SettingsIcon/>}
              square
            />
          </SidebarHeader>
          <SidebarActionButton
            icon={<Loader/>}
          />
        </Sidebar>
      </SidebarWrapper>
      <ContentWrapper/>
    </Layout>
  )
}
