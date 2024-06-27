import type { Message, FoldersMessages } from '~/core/store'
import { formatDate } from '~/tools/format-date'
import {
  SEPARATOR,
  TITLE_SEPARATOR,
  FOLDER_POSTFIX,
  checkIsFileMessage,
  parseFileMessage,
  checkIsParentFilesMessage
} from '~/tools/handle-content'
import {
  convertStrippedImageBytesToUrl
} from '~/tools/handle-content-media'

export const API_ID = +(process.env.API_ID || '')
export const API_HASH = `${process.env.API_HASH || ''}`
export const IS_TEST = `${process.env.API_TEST || ''}` !== 'false'
export const META_KEY = IS_TEST ? 'metatest' : 'meta'

export const transformUser = (user, country) => {
  if (!user) return null

  return {
    id: user.id,
    access_hash: user.access_hash,
    phone: user.phone,
    username: user.username,
    firstName: user.first_name,
    lastName: user.last_name,
    photo: user.photo?.photo_id ? {
      id: user.photo.photo_id,
      dc_id: user.photo.dc_id
    } : undefined,
    country: country?.toLowerCase() || 'en'
  }
}

export const transformFolder = chat => {
  const [fullTitle, category] = chat.title
    .replace(FOLDER_POSTFIX, '')
    .split(SEPARATOR)
    .slice(0, 2)

  const [title, group] = fullTitle
    .split(TITLE_SEPARATOR)

  return {
    id: chat.id,
    access_hash: chat.access_hash,
    title,
    group: group || '',
    category: category || '',
    general: chat.general
  }
}

export const transformMessage = (message, user, { allowEmpty = false } = {}) => {
  const {
    id,
    message: text = '',
    entities,
    date,
    edit_date: editDate,
    media: fullMedia,
    fwd_from,
    views
  } = message
  const media = fullMedia && transformMedia(fullMedia)

  if (!allowEmpty && !text && !media) return

  const isFileMessage = checkIsFileMessage(text)
  const isParentFilesMessage = !isFileMessage && checkIsParentFilesMessage(text)

  return {
    id,
    parentId: isFileMessage ? parseFileMessage(text).parentId : undefined,
    isParent: isParentFilesMessage,
    text,
    entities: entities?.map(({ _, ...entity }) => ({ type: _, ...entity })),
    date: formatDate(date, user.country),
    editDate,
    ...((media?.url || media?.pending) ? { webpage: media } : media ? { media } : {}),
    ...(fwd_from ? { fwd: { name: fwd_from.from_name } } : {}),
    views,
  }
}

export const transformSposoredMessage = (message, targets) => {
  const {
    message: text = '',
    entities,
    random_id: id,
    from_id,
    start_param
  } = message
  const { user_id, chat_id, channel_id } = from_id
  const target = targets.find(({ id }) => id === (user_id || chat_id || channel_id))
  if (!target || !target.username) {
    return null
  }

  return {
    id,
    text,
    entities: entities?.map(({ _, ...entity }) => ({ type: _, ...entity })),
    title: target.title,
    link: `https://t.me/${target.username}${start_param ? `/?start=${start_param}` : ''}`
  }
}

export const transformMedia = (media) => {
  const { _ } = media

  if (['messageMediaPhoto', 'messageMediaDocument'].includes(_)) {
    return parseFile(media.photo, media.document)
  }

  if (_ === 'messageMediaWebPage') {
    const { webpage } = media
    if (webpage.url) {
      return {
        id: webpage.id,
        url: webpage.url,
        displayUrl: webpage.display_url,
        siteName: webpage.site_name,
        title: webpage.title,
        description: webpage.description,
        duration: webpage.duration,
        type: webpage.type,
        author: webpage.author,
        embedUrl: webpage.embed_url,
        embedType: webpage.embed_type,
        embedWidth: webpage.embed_width,
        embedHeight: webpage.embed_height,
        file: parseFile(webpage.photo, webpage.document),
        pending: false
      }
    } else if (webpage._ === 'webPagePending') {
      return {
        id: webpage.id,
        pending: true
      }
    } else {
      return
    }
  }
}

const parseFile = (photo, document) => {
  const file = photo || document
  if (!file?.access_hash || file?.has_stickers) return

  const {
    id, date, access_hash, file_reference, dc_id,
    sizes, video_sizes,
    mime_type, size, attributes, thumbs, video_thumbs
  } = file
  const isPhoto = !!photo
  const type = isPhoto ? 'image/jpeg' : mime_type
  const name = isPhoto ? `photo-${date}.jpg` : (attributes?.find(({ _ }) => _ === 'documentAttributeFilename')?.file_name || '')
  const description = attributes?.find(({ _ }) => _ === 'documentAttributeAudio')
  const duration = attributes?.find(({ _ }) => ['documentAttributeAudio', 'documentAttributeVideo'].includes(_))?.duration
  const nameParts = name.split('.')
  const ext = nameParts[nameParts.length - 1]

  const filteredPhotos = (sizes || thumbs)?.filter(({ _ }) => _ === 'photoSize')
  const filteredPhotoSizes = filteredPhotos?.map(({ size }) => size)
  const originalPhoto = isPhoto ? filteredPhotos?.find(({ size }) => size === Math.max(...filteredPhotoSizes)) : undefined
  let originalSize = originalPhoto?.size || size
  originalSize = typeof originalSize === 'string' ? parseInt(originalSize, 16) : originalSize
  const originalSizeType = originalPhoto?.type || ''

  const thumbS = (sizes || thumbs)?.find(({ _ }) => _ === 'photoStrippedSize')
  const thumbSUrl = thumbS?.bytes && convertStrippedImageBytesToUrl(thumbS.bytes)
  const thumbM = filteredPhotos?.find(({ size }) => size === Math.min(...filteredPhotoSizes))
  const thumbVideo = (video_sizes || video_thumbs)?.[0]

  return {
    id,
    access_hash,
    file_reference,
    name,
    description: description ? {
      performer: description.performer,
      title: description.title
    } : undefined,
    duration,
    type,
    ext,
    originalSize,
    originalSizeType: originalSizeType,
    attributes,
    dc_id,
    thumbSUrl,
    thumbM: thumbM ? {
      size: thumbM.size,
      sizeType: thumbM.type
    } : undefined,
    thumbVideo
  }
}

export const sortFolders = folders => {
  return folders.sort((a, b) =>
    new Intl.Collator(undefined, { sensitivity: 'base' }).compare(a.category, b.category) ||
    ((!a.group && !b.group) ? 0 : !a.group ? 1 : !b.group ? -1 : new Intl.Collator(undefined, { sensitivity: 'base' }).compare(a.group, b.group)) ||
    new Intl.Collator(undefined, { sensitivity: 'base' }).compare(a.title, b.title)
  )
}

export const sortMessages = (messages: [number, Message][]) => {
  return messages.sort((a, b) =>
    ((b[1].parentId || b[1].id) - (a[1].parentId || a[1].id)) ||
    (b[1].id - a[1].id)
  )
}

export const generateRandomId = () => {
  return `${Math.floor(Math.random() * 0xFFFFFFFF)}${Math.floor(Math.random() * 0xFFFFFF)}`.slice(0, 16)
}

export const findFolderIdByMessageId = (foldersMessages: FoldersMessages, messageId: number) => {
  return [...foldersMessages.entries()].find(([_folderId, folderMessages]) => folderMessages.has(messageId))?.[0]
}
