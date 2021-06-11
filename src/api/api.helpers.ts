import type { Message } from '~/core/store'
import { formatDate } from '~/tools/format-date'
import {
  SEPARATOR,
  FOLDER_POSTFIX,
  checkIsFileMessage,
  parseFileMessage
} from '~/tools/handle-content'
import {
  convertStrippedImageBytesToUrl,
  convertImageBytesToUrl
} from '~/tools/handle-content-files'

import type { MessageMedia } from './mtproto'

export const API_ID = +(process.env.API_ID || '')
export const API_HASH = `${process.env.API_HASH || ''}`
export const IS_TEST = `${process.env.API_TEST || ''}` !== 'false'
export const META_KEY = IS_TEST ? 'metatest' : 'meta'

export const FILE_SIZE = {
  MB10: 10485760,
  MB100: 104857600,
  MB750: 786432000,
  MB1500: 1572864000
}

export const getFilePartSize = (fileSize) =>  (
  fileSize <= FILE_SIZE.MB100 ? 128 :
    fileSize <= FILE_SIZE.MB750 ? 256 :
      fileSize <= FILE_SIZE.MB1500 ? 512 :
        0
) * 1024

export const transformFolder = chat => {
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

export const transformMessage = (message, user) => {
  const {
    id,
    message: text,
    date,
    edit_date: editDate,
    media: fullMedia,
    views
  } = message

  return {
    id,
    parentId: checkIsFileMessage(text) ? parseFileMessage(text).parentId : undefined,
    text,
    date: formatDate(date, user.country),
    editDate,
    media: fullMedia && transformMedia(fullMedia),
    views
  }
}

export const transformMedia = (media) => {
  const { _ } = media

  if (['messageMediaPhoto', 'messageMediaDocument'].includes(_)) {
    const file = media.photo || media.document

    if (!file?.access_hash) return undefined

    const {
      id, access_hash, file_reference, dc_id,
      sizes, video_sizes,
      mime_type: type, size, attributes, thumbs, video_thumbs
    } = file
    const name = attributes?.find(({ _ }) => _ === 'documentAttributeFilename')?.file_name || ''
    const thumbS = (sizes || thumbs)?.find(({ _ }) => _ === 'photoStrippedSize')
    const thumbSUrl = thumbS?.bytes && convertStrippedImageBytesToUrl(thumbS.bytes)
    const thumbM = (sizes || thumbs)?.find(({ _ }) => ['photoCachedSize', 'photoSize'].includes(_))
    const thumbMUrl = thumbM?.bytes && convertImageBytesToUrl(thumbM.bytes)
    const thumbVideo = (video_sizes || video_thumbs)?.[0]

    return {
      id,
      access_hash,
      file_reference,
      name,
      type: type || 'image/jpeg',
      size,
      attributes,
      dc_id,
      thumbSUrl,
      thumbM: {
        size: thumbM.size,
        location: thumbM.location
      },
      thumbMUrl,
      thumbVideo
    }
  }

  if (_ === 'messageMediaWebPage') {
    const { webpage } = media as MessageMedia.messageMediaWebPage
    return undefined
  }
}

export const sortFolders = folders => {
  return folders.sort((a, b) =>
    new Intl.Collator(undefined, { sensitivity: 'base' }).compare(a.category, b.category) ||
    new Intl.Collator(undefined, { sensitivity: 'base' }).compare(a.title, b.title)
  )
}

export const sortMessages = (messages: [number, Message][]) => {
  const mainMessages: Map<number, Message> = new Map()

  messages.forEach(([, message]) => {
    const { id, parentId } = message
    const mainMessage = mainMessages.get(parentId || id)

    if (parentId) {
      const fileMessages = [
        ...(mainMessages[parentId]?.fileMessages || []),
        message
      ].sort((a, b) => b.id - a.id)

      mainMessages.set(parentId, {
        ...(mainMessage || {
          id: parentId,
          text: '',
          date: message.date
        }),
        fileMessages
      })
    } else {
      mainMessages.set(id, {
        ...mainMessage,
        ...message
      })
    }
  })

  return [...mainMessages].sort((a, b) => b[1].id - a[1].id)
}

export const wait = delay => {
  return new Promise(resolve => setTimeout(resolve, delay))
}

export const generateRandomId = () => {
  return `${Math.floor(Math.random() * 0xFFFFFFFF) + Math.floor(Math.random() * 0xFFFFFF)}`
}
