import type { FunctionComponent as FC } from 'preact'
import { h } from 'preact'
import { memo } from 'preact/compat'
import { useCallback, useEffect, useMemo, useState } from 'preact/hooks'

import { useTexts } from '~/core/hooks'
import { useCallbackRef } from '~/tools/hooks'
import { SidebarItem } from '~/ui/elements/sidebar-item'

import type { FoldersFormPopupParams } from './storage'

type Props = {
  group: string
  category: string
  index: number
  disabled?: boolean
  withoutMenu?: boolean
  expanded?: boolean
  toggling?: boolean
  setFoldersFormPopupParams?: (params: FoldersFormPopupParams) => void
  onGroupSelect?: (group: string, category: string, index: number) => void
}

export const StorageSidebarFoldersListGroup: FC<Props> = memo(({
  group,
  category,
  index,
  disabled,
  withoutMenu,
  expanded,
  toggling,
  setFoldersFormPopupParams,
  onGroupSelect
}) => {
  const { texts } = useTexts('storage')
  const [sendingMessagesCount, setSendingMessagesCount] = useState(0)

  const handleClick = useCallback(() => {
    onGroupSelect?.(group, category, index)
  }, [group, category, index, onGroupSelect])

  const [_handleSendingMessage, handleSendingMessageRef] = useCallbackRef(ev => {
    if (ev.detail.group !== group) return
    setSendingMessagesCount(count => count + (ev.detail.exist ? 1 : -1))
  }, [group, setSendingMessagesCount])

  const editGroup = useCallback(() => {
    setFoldersFormPopupParams?.({
      group,
      category,
      isEditGroup: true
    })
  }, [group, category, setFoldersFormPopupParams])

  const addFolder = useCallback(() => {
    setFoldersFormPopupParams?.({
      group,
      category
    })
  }, [group, category, setFoldersFormPopupParams])

  const menu = useMemo(() => ({
    items: [{
      title: texts.groupEditTitle,
      icon: 'edit',
      onClick: editGroup
    }, {
      title: texts.folderAddTitle,
      icon: 'folder-plus',
      onClick: addFolder
    }]
  }), [
    texts.groupEditTitle,
    texts.folderAddTitle,
    editGroup,
    addFolder
  ])

  useEffect(() => {
    const handleSendingMessage = (ev) => handleSendingMessageRef.current?.(ev)

    self.document.addEventListener('sendingMessage', handleSendingMessage, { passive: true })
    return () => self.document.removeEventListener('sendingMessage', handleSendingMessage)
  }, [])

  return (
    <SidebarItem
      title={group}
      description=""
      emptyDescription=""
      index={index}
      disabled={disabled}
      menu={withoutMenu ? null : menu}
      loading={!expanded && !toggling && sendingMessagesCount > 0}
      group
      expanded={expanded}
      toggling={toggling}
      onClick={handleClick}
    />
  )
})
