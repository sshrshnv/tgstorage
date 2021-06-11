import { h } from 'preact'
import type { FunctionComponent as FC } from 'preact'
import { useMemo, useCallback } from 'preact/hooks'
import cn from 'classnames'

import {
  CHECKLIST_CHECK_MARK_LENGTH,
  CHECKLIST_CHECKED_MARK
} from '~/tools/handle-content'
import { CheckIcon } from '~/ui/icons'

import styles from './content-item-checklist.styl'

type Props = {
  item: string
  index: number
  loading?: boolean
  toggleItem: (index: number) => void
}

export const ContentItemChecklistItem: FC<Props> = ({
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
        styles.checklistItem,
        isChecked && styles._checked
      )}
      onClick={loading ? undefined : toggle}
    >
      {isChecked && (
        <CheckIcon/>
      )}
      <span>{text}</span>
    </div>
  ) : null
}
