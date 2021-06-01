export type PARSED_CHECKLIST = {
  title: string
  items: string[]
}

export const CHECKLIST_MARK = '#checklist'
export const CHECKLIST_CHECK_MARK_LENGTH = 2
export const CHECKLIST_CHECKED_MARK = '+ '
export const CHECKLIST_UNCHECKED_MARK = '- '

export const checkIsChecklist = (text: string) =>
  text.endsWith(CHECKLIST_MARK)

export const parseChecklist = (text: string, { empty = false } = {}): PARSED_CHECKLIST => {
  const parts = text.replace(CHECKLIST_MARK, '').split('\n')
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

export const stringifyChecklist = (title: string, items: string[]) => {
  return `${[title, ...items].join('\n')}\n${CHECKLIST_MARK}`
}
