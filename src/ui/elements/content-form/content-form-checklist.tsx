import { h, Fragment } from 'preact'
import type { FunctionComponent as FC } from 'preact'
import { useCallback, useMemo } from 'preact/hooks'
import cn from 'classnames'

import {
  CHECKLIST_CHECK_MARK_LENGTH,
  parseChecklist,
  stringifyChecklist
} from '~/tools/handle-checklist'
import { useDragReorder } from '~/ui/hooks/use-drag-reoder'
import { Input } from '~/ui/elements/input'
import { Loader } from '~/ui/elements/loader'
import { Button } from '~/ui/elements/button'
import { SendIcon } from '~/ui/icons/'

import { ContentFormChecklistItem } from './content-form-checklist-item'
import styles from './content-form.styl'

type Props = {
  text: string
  titlePlaceholder?: string
  itemPlaceholder?: string
  loading?: boolean
  onChangeText?: (note: string) => void
  onSubmit?: () => void
  scrollToBottom?: () => void
}

export const ContentFormChecklist: FC<Props> = ({
  text,
  titlePlaceholder,
  itemPlaceholder,
  loading,
  onChangeText,
  onSubmit,
  scrollToBottom
}) => {
  const parsedChecklist = useMemo(() => {
    return parseChecklist(text, { empty: true })
  }, [text])

  const isSubmitAvailable = useMemo(() => {
    return parsedChecklist.items
      .some(item => !!item.slice(CHECKLIST_CHECK_MARK_LENGTH).length)
  }, [parsedChecklist])

  const handleReorder = useCallback((items) => {
    onChangeText?.(stringifyChecklist(
      parsedChecklist.title,
      items
    ))
  }, [parsedChecklist.title, onChangeText])

  const handleInputTitle = useCallback((value) => {
    onChangeText?.(stringifyChecklist(
      value,
      parsedChecklist.items
    ))
  }, [parsedChecklist, onChangeText])

  const handleInputItem = useCallback((value, index) => {
    onChangeText?.(stringifyChecklist(
      parsedChecklist.title,
      parsedChecklist.items.map((item, i) => i === index ?
        `${item.slice(0, CHECKLIST_CHECK_MARK_LENGTH)}${value}` :
        item
      )
    ))
  }, [parsedChecklist, onChangeText])

  const handleDeleteItem = useCallback(index => {
    onChangeText?.(stringifyChecklist(
      parsedChecklist.title,
      [...parsedChecklist.items.slice(0, index), ...parsedChecklist.items.slice(index + 1)]
    ))
  }, [parsedChecklist, onChangeText])

  const handleSubmit = useCallback(() => {
    const parsedChecklist = parseChecklist(text, { empty: false })

    onChangeText?.(stringifyChecklist(
      parsedChecklist.title,
      parsedChecklist.items
    ))

    onSubmit?.()
  }, [text])

  const handleLastMount = useCallback(() => {
    scrollToBottom?.()
  }, [scrollToBottom])

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
      {loading ? (
        <Loader class={styles.loader}/>
      ) : (
        <Button
          class={cn(
            styles.button,
            isSubmitAvailable && styles._primary
          )}
          icon={<SendIcon/>}
          disabled={!isSubmitAvailable}
          onClick={handleSubmit}
        />
      )}
    </Fragment>
  )
}
