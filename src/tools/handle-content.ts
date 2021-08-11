import type { FolderMessages, Message } from '~/core/store'

export const SEPARATOR = '::'
export const POSTFIX = 'tgs'


export const FOLDER_POSTFIX = `${SEPARATOR}${POSTFIX}`

export const normalizeCategoryName = (categoryValue: string, texts) =>
  categoryValue.toLowerCase() === texts.generalCategoryTitle.toLowerCase() ? '' : categoryValue

export const generateFolderName = (folderValue: string, categoryName: string) =>
  `${folderValue}${categoryName ? `${SEPARATOR}${categoryName}` : ''}`


export const CHECKLIST_MESSAGE_MARK = `checklist${SEPARATOR}${POSTFIX}`

export type ParsedChecklistMessage = {
  title: string
  items: string[]
}

export const CHECKLIST_CHECK_MARK_LENGTH = 2
export const CHECKLIST_CHECKED_MARK = '+ '
export const CHECKLIST_UNCHECKED_MARK = '- '

export const checkIsChecklistMessage = (text: string) =>
  text.endsWith(CHECKLIST_MESSAGE_MARK)

export const parseChecklistMessage = (text: string, { empty = false } = {}): ParsedChecklistMessage => {
  const parts = text.replace(CHECKLIST_MESSAGE_MARK, '').split('\n')
  const hasTitle = [CHECKLIST_CHECKED_MARK, CHECKLIST_UNCHECKED_MARK].every(mark => !parts[0].startsWith(mark))
  const title = hasTitle ? parts[0] : ''
  const items = parts.slice(hasTitle ? 1 : 0, parts.length - 1)

  if (empty && items[items.length - 1]?.slice(CHECKLIST_CHECK_MARK_LENGTH) !== '') {
    items.push(CHECKLIST_UNCHECKED_MARK)
  }

  return {
    title,
    items: empty ? items : items.filter(item => !!item.slice(1).length)
  }
}

export const stringifyChecklistMessage = (title: string, items: string[]) =>
  `${[title, ...items].join('\n')}\n${CHECKLIST_MESSAGE_MARK}`


export const PARENT_FILES_MESSAGE_MARK = `files${SEPARATOR}${POSTFIX}`

export const checkIsParentFilesMessage = (text: string) =>
  text.endsWith(PARENT_FILES_MESSAGE_MARK)

export const parseParentFilesMessage = (text: string) => {
  const parts = text.split('\n')
  return {
    text: parts.slice(0, parts.length - 1).join('\n')
  }
}

export const stringifyParentFilesMessage = (text: string) =>
  text.endsWith(PARENT_FILES_MESSAGE_MARK) ? text :
    `${text ? `${text}\n` : ''}${PARENT_FILES_MESSAGE_MARK}`


export const FILE_MESSAGE_MARK = `file${SEPARATOR}${POSTFIX}`

export const checkIsFileMessage = (text: string) =>
  text.endsWith(FILE_MESSAGE_MARK)

export const parseFileMessage = (text: string) => {
  const parts = text.split('\n')

  return {
    text: parts.slice(0, parts.length - 1).join('\n'),
    parentId: +parts[parts.length - 1].split(SEPARATOR)[0]
  }
}

export const stringifyFileMessage = (text: string, parentId: number) =>
  `${text ? `${text}\n` : ''}${generateFileMessageMark(parentId)}`

export const generateFileMessageMark = (parentId: number) =>
  `${parentId}${SEPARATOR}${FILE_MESSAGE_MARK}`

export const groupMessages = (messages: Message[]) => {
  const groupedMessages: FolderMessages = new Map()

  messages.forEach((message) => {
    const { id, parentId } = message
    const groupedMessage = groupedMessages.get(parentId || id)

    if (parentId) {
      const mediaMessages = [
        ...(groupedMessage?.mediaMessages || []),
        message
      ]

      groupedMessages.set(parentId, {
        ...(groupedMessage || {
          id: parentId,
          text: '',
          date: message.date
        }),
        mediaMessages
      })
    } else {
      groupedMessages.set(id, {
        ...groupedMessage,
        ...message
      })
    }
  })

  return [...groupedMessages.values()]
}

export const normalizePreviewText = (text: string, { filesTitle }) =>
  text.replace(CHECKLIST_MESSAGE_MARK, '').replace(PARENT_FILES_MESSAGE_MARK, filesTitle)
