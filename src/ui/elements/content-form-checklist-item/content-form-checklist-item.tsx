import { Fragment, h } from 'preact'
import type { FunctionComponent as FC } from 'preact'
import { memo } from 'preact/compat'
import { useCallback, useMemo, useEffect } from 'preact/hooks'
import cn from 'classnames'

import { useMemoRef, useUpdatableRef } from '~/tools/hooks'
import { CHECKLIST_CHECK_MARK_LENGTH } from '~/tools/handle-content'
import { Input } from '~/ui/elements/input'
import { Button } from '~/ui/elements/button'
import { Icon } from '~/ui/elements/icon'

import styles from './content-form-checklist-item.styl'

type Props = {
  item: string
  index: number
  length: number
  itemPlaceholder?: string
  draggingIndex?: number | null
  draggingValue?: string
  enteringIndex?: number | null
  handleInputItem: (value: string, index: number) => void
  handleDeleteItem: (index: number) => void
  handleDragStartItem: (index: number) => void
  handleDragEnterItem: (index: number) => void
  handleDragEndItem: () => void
  handleLastMount: () => void
}

export const ContentFormChecklistItem: FC<Props> = memo(({
  item,
  index,
  length,
  itemPlaceholder,
  draggingIndex,
  draggingValue,
  enteringIndex,
  handleInputItem,
  handleDeleteItem,
  handleDragStartItem,
  handleDragEnterItem,
  handleDragEndItem,
  handleLastMount
}) => {
  const isFirstItem = useMemo(() => {
    return index === 0
  }, [index])

  const [isLastItem, isLastItemRef] = useMemoRef(() => {
    return index === length - 1
  }, [index, length])

  const isEntering = useMemo(() => {
    return (
      [draggingIndex, enteringIndex].every(index => typeof index === 'number') &&
      draggingIndex !== enteringIndex &&
      (enteringIndex === index || (enteringIndex === length - 1 && index === length - 1))
    )
  }, [index, draggingIndex, enteringIndex, length])

  const isFirstFakeChecklistItem = useMemo(() => {
    return isEntering && (
      ((draggingIndex as number) > (enteringIndex as number)) ||
      (enteringIndex === length - 1)
    )
  }, [draggingIndex, enteringIndex, length, isEntering])

  const isLastFakeChecklistItem = useMemo(() => {
    return isEntering && (
      ((draggingIndex as number) < (enteringIndex as number)) &&
      (enteringIndex !== length - 1)
    )
  }, [draggingIndex, enteringIndex, length, isEntering])

  const fakeCheclistValue = useMemo(() => {
    return (
      (isFirstFakeChecklistItem || isLastFakeChecklistItem) &&
      draggingValue?.slice(CHECKLIST_CHECK_MARK_LENGTH)
    )
  }, [draggingValue, isFirstFakeChecklistItem, isLastFakeChecklistItem])

  const isDragging = draggingIndex === index

  const handleLastMountRef = useUpdatableRef(handleLastMount)

  const handleInput = useCallback((value) => {
    return handleInputItem(value, index)
  }, [index, handleInputItem])

  const handleDelete = useCallback(() => {
    return handleDeleteItem(index)
  }, [index, handleDeleteItem])

  const handleDragStart = useCallback(() => {
    return handleDragStartItem(index)
  }, [index, handleDragStartItem])

  const handleDragEnter = useCallback(() => {
    return handleDragEnterItem(index)
  }, [index, handleDragEnterItem])

  const handleDragEnd = useCallback(() => {
    return handleDragEndItem()
  }, [handleDragEndItem])

  useEffect(() => {
    if (!isLastItemRef.current) return
    handleLastMountRef.current()
  }, [])

  return (
    <Fragment>
      {isFirstFakeChecklistItem && (
        <div class={styles.fake}>
          {fakeCheclistValue}
        </div>
      )}
      <div
        class={cn(
          styles.root,
          isDragging && styles._dragging
        )}
        key={index}
      >
        <div
          class={styles.icon}
          onDragStart={handleDragStart}
          onDragEnter={handleDragEnter}
          onDragEnd={handleDragEnd}
          draggable={!isLastItem}
        >
          {!isLastItem && (
            <Icon icon="drag"/>
          )}
        </div>
        <Input
          class={styles.input}
          value={item.slice(CHECKLIST_CHECK_MARK_LENGTH)}
          placeholder={itemPlaceholder}
          border={false}
          autoFocus={isFirstItem && isLastItem}
          onInput={handleInput}
        />
        {!isLastItem && (
          <Button
            class={styles.button}
            icon="cross"
            onClick={handleDelete}
          />
        )}
      </div>
      {isLastFakeChecklistItem && (
        <div class={styles.fake}>
          {fakeCheclistValue}
        </div>
      )}
    </Fragment>
  )
})
