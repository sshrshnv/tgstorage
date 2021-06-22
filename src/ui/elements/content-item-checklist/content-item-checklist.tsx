import { h, Fragment } from 'preact'
import type { FunctionComponent as FC } from 'preact'
import { memo } from 'preact/compat'
import { useMemo, useCallback } from 'preact/hooks'

import {
  CHECKLIST_CHECK_MARK_LENGTH,
  CHECKLIST_CHECKED_MARK,
  CHECKLIST_UNCHECKED_MARK,
  parseChecklistMessage,
  stringifyChecklistMessage
} from '~/tools/handle-content'
import { Break } from '~/ui/elements/break'

import { ContentItemChecklistItem } from './content-item-checklist-item'
import styles from './content-item-checklist.styl'

type Props = {
  text: string
  loading?: boolean
  editText: (text: string) => Promise<void>
}

export const ContentItemChecklist: FC<Props> = memo(({
  text,
  loading,
  editText
}) => {
  const parsedChecklist = useMemo(() => {
    return parseChecklistMessage(text)
  }, [text])

  const toggleItem = useCallback((index) => {
    editText(stringifyChecklistMessage(
      parsedChecklist.title,
      parsedChecklist.items.map((item, i) => {
        if (i !== index) {
          return item
        }

        const mark = item.startsWith(CHECKLIST_CHECKED_MARK) ?
          CHECKLIST_UNCHECKED_MARK :
          CHECKLIST_CHECKED_MARK
        return `${mark}${item.slice(CHECKLIST_CHECK_MARK_LENGTH)}`
      })
    ))
  }, [parsedChecklist, editText])

  return (
    <div class={styles.root}>
      {!!parsedChecklist.title.length && (
        <Fragment>
          {parsedChecklist.title}
          <Break size={12} px/>
        </Fragment>
      )}
      {parsedChecklist.items.map((item, index) => (
        <ContentItemChecklistItem
          key={item}
          item={item}
          index={index}
          loading={loading}
          toggleItem={toggleItem}
        />
      ))}
    </div>
  )
})
