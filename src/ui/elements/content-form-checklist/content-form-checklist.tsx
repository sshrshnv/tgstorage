import { h, Fragment } from 'preact'
import type { FunctionComponent as FC } from 'preact'
import { memo } from 'preact/compat'
import { useCallback, useMemo, useRef } from 'preact/hooks'
import cn from 'classnames'

import {
  CHECKLIST_CHECK_MARK_LENGTH,
  parseChecklistMessage,
  stringifyChecklistMessage
} from '~/tools/handle-content'
import { ContentFormChecklistItem } from '~/ui/elements/content-form-checklist-item'
import { useDragReorder } from '~/ui/hooks/hooks.use-drag-reoder'
import { Input } from '~/ui/elements/input'
import { Loader } from '~/ui/elements/loader'
import { Button } from '~/ui/elements/button'

import styles from './content-form-checklist.styl'

type Props = {
  text: string
  titlePlaceholder?: string
  itemPlaceholder?: string
  loading?: boolean
  onChangeText?: (note: string) => void
  onSubmit?: () => void
}

export const ContentFormChecklist: FC<Props> = memo(({
  text,
  titlePlaceholder,
  itemPlaceholder,
  loading,
  onChangeText,
  onSubmit
}) => {
  const itemsElRef = useRef<HTMLDivElement>(null)

  const parsedChecklist = useMemo(() => {
    return parseChecklistMessage(text, { empty: true })
  }, [text])

  const itemsCount = useMemo(() => {
    return parsedChecklist.items
      .filter(item => !!item.slice(CHECKLIST_CHECK_MARK_LENGTH).length)
      .length
  }, [parsedChecklist])

  const handleReorder = useCallback((items) => {
    onChangeText?.(stringifyChecklistMessage(
      parsedChecklist.title,
      items
    ))
  }, [parsedChecklist.title, onChangeText])

  const handleInputTitle = useCallback((value) => {
    onChangeText?.(stringifyChecklistMessage(
      value,
      parsedChecklist.items
    ))
  }, [parsedChecklist, onChangeText])

  const handleInputItem = useCallback((value, index) => {
    onChangeText?.(stringifyChecklistMessage(
      parsedChecklist.title,
      parsedChecklist.items.map((item, i) => i === index ?
        `${item.slice(0, CHECKLIST_CHECK_MARK_LENGTH)}${value}` :
        item
      )
    ))
  }, [parsedChecklist, onChangeText])

  const handleDeleteItem = useCallback(index => {
    onChangeText?.(stringifyChecklistMessage(
      parsedChecklist.title,
      [...parsedChecklist.items.slice(0, index), ...parsedChecklist.items.slice(index + 1)]
    ))
  }, [parsedChecklist, onChangeText])

  const handleSubmit = useCallback(() => {
    const parsedChecklist = parseChecklistMessage(text, { empty: false })

    onChangeText?.(stringifyChecklistMessage(
      parsedChecklist.title,
      parsedChecklist.items
    ))

    onSubmit?.()
  }, [text, onChangeText, onSubmit])

  const handleLastMount = useCallback(() => {
    itemsElRef?.current?.scrollTo(0, itemsElRef.current.scrollHeight)
  }, [])

  const {
    draggingIndex,
    enteringIndex,
    handleDragStart,
    handleDragEnter,
    handleDragEnd
  } = useDragReorder(
    parsedChecklist.items.slice(0, parsedChecklist.items.length - 1),
    handleReorder
  )

  return (
    <Fragment>
      <div>
        <Input
          class={cn(
            styles.input,
            styles._border
          )}
          value={parsedChecklist.title}
          placeholder={titlePlaceholder}
          border={false}
          onInput={handleInputTitle}
        />
        <div
          class={styles.items}
          ref={itemsElRef}
        >
          {parsedChecklist.items.map((item, index) => (
            <ContentFormChecklistItem
              key={index}
              item={item}
              index={index}
              length={parsedChecklist.items.length}
              itemPlaceholder={itemPlaceholder}
              draggingIndex={draggingIndex}
              draggingValue={typeof draggingIndex === 'number' ? parsedChecklist.items[draggingIndex] : ''}
              enteringIndex={enteringIndex}
              handleInputItem={handleInputItem}
              handleDeleteItem={handleDeleteItem}
              handleDragStartItem={handleDragStart}
              handleDragEnterItem={handleDragEnter}
              handleDragEndItem={handleDragEnd}
              handleLastMount={handleLastMount}
            />
          ))}
        </div>
      </div>
      {loading ? (
        <Loader class={styles.loader} brand/>
      ) : (
        <Button
          class={cn(
            styles.button,
            !!itemsCount && styles._primary
          )}
          icon="send"
          disabled={!itemsCount}
          onClick={handleSubmit}
        />
      )}
      {!!itemsCount && (
        <div class={styles.itemsCount}>
          # {itemsCount}
        </div>
      )}
    </Fragment>
  )
})
