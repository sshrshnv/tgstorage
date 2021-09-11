import type { FunctionComponent as FC } from 'preact'
import { h } from 'preact'
import { memo } from 'preact/compat'
import { useMemo, useCallback } from 'preact/hooks'
import cn from 'classnames'

import {
  CHECKLIST_CHECK_MARK_LENGTH,
  CHECKLIST_CHECKED_MARK
} from '~/tools/handle-content'
import { Icon } from '~/ui/elements/icon'

import styles from './content-item-checklist-item.styl'

type Props = {
  item: string
  index: number
  loading?: boolean
  toggleItem: (index: number) => void
}

export const ContentItemChecklistItem: FC<Props> = memo(({
  item,
  index,
  loading,
  toggleItem
}) => {
  const text = useMemo(() => {
    return item.slice(CHECKLIST_CHECK_MARK_LENGTH)
  }, [item])

  const isChecked = useMemo(() => {
    return item.startsWith(CHECKLIST_CHECKED_MARK)
  }, [item])

  const toggle = useCallback(() => {
    toggleItem(index)
  }, [index, toggleItem])

  return text ? (
    <div
      class={cn(
        styles.root,
        isChecked && styles._checked
      )}
      onClick={loading ? undefined : toggle}
    >
      {isChecked && (
        <Icon icon="check"/>
      )}
      <span>{text}</span>
    </div>
  ) : null
})
