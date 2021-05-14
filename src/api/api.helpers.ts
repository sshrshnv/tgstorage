import { formatDate } from '~/tools/format-date'

export const API_ID = +(process.env.API_ID || '')
export const API_HASH = `${process.env.API_HASH || ''}`
export const IS_TEST = `${process.env.API_TEST || ''}` !== 'false'
export const META_KEY = IS_TEST ? 'metatest' : 'meta'
export const SEPARATOR = '::'
export const FOLDER_POSTFIX = `${SEPARATOR}tgs`

export const convertChatToFolder = chat => {
  const [title, category] = chat.title
    .replace(FOLDER_POSTFIX, '')
    .split(SEPARATOR)
    .slice(0, 2)

  return {
    id: chat.id,
    access_hash: chat.access_hash,
    title,
    category: category || '',
    general: chat.general
  }
}

export const sortFolders = folders => {
  return folders.sort((a, b) =>
    new Intl.Collator(undefined, { sensitivity: 'base' }).compare(a.category, b.category) ||
    new Intl.Collator(undefined, { sensitivity: 'base' }).compare(a.title, b.title)
  )
}

export const normalizeMessage = (message, user) => {
  const {
    id,
    message: text,
    date,
    edit_date: editDate,
    media,
    views,
    grouped_id: groupedId
  } = message

  return {
    id,
    text,
    date: formatDate(date, user.country),
    editDate,
    media,
    views,
    groupedId
  }
}

export const wait = delay => {
  return new Promise(resolve => setTimeout(resolve, delay))
}

export const generateRandomId = () => {
  return Math.ceil(Math.random() * 0xFFFFFF).toString(16) + Math.ceil(Math.random() * 0xFFFFFF).toString(16)
}

export const normalizeCategoryName = (categoryValue: string, texts) =>
  categoryValue.toLowerCase() === texts.generalCategoryTitle.toLowerCase() ? '' : categoryValue

export const generateFolderName = (folderValue: string, categoryName: string) =>
  `${folderValue}${categoryName ? `${SEPARATOR}${categoryName}` : ''}`
