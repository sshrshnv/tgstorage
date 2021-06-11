export const SEPARATOR = '::'
export const POSTFIX = 'tgs'

// FOLDERS

export const FOLDER_POSTFIX = `${SEPARATOR}${POSTFIX}`

export const normalizeCategoryName = (categoryValue: string, texts) =>
  categoryValue.toLowerCase() === texts.generalCategoryTitle.toLowerCase() ? '' : categoryValue

export const generateFolderName = (folderValue: string, categoryName: string) =>
  `${folderValue}${categoryName ? `${SEPARATOR}${categoryName}` : ''}`

// CHECKLIST MESSAGES

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

// FILE MESSAGES

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
