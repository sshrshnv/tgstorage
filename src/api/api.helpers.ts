import type { Message } from '~/core/store'
import { formatDate } from '~/tools/format-date'
import {
  SEPARATOR,
  FOLDER_POSTFIX,
  checkIsFileMessage,
  parseFileMessage,
  checkIsParentFilesMessage
} from '~/tools/handle-content'
import {
  convertStrippedImageBytesToUrl
} from '~/tools/handle-content-media'

import type { MessageMedia } from './mtproto'

export const API_ID = +(process.env.API_ID || '')
export const API_HASH = `${process.env.API_HASH || ''}`
export const IS_TEST = `${process.env.API_TEST || ''}` !== 'false'
export const META_KEY = IS_TEST ? 'metatest' : 'meta'

export const transformUser = (user, country) => {
  if (!user) return null

  /*
    let photo: {
      bytes: Uint8Array
      type: string
    } | null = null

    if (user.photo?.photo_id) {
      photo = await this.getFile({
        _: 'inputPeerPhotoFileLocation',
        peer: { _: 'inputPeerSelf' },
        volume_id: user.photo.photo_small.volume_id,
        local_id: user.photo.photo_small.local_id
      },
      user.photo.dc_id
      )
    }
    */

  return {
    id: user.id,
    access_hash: user.access_hash,
    first_name: user.first_name,
    country
  }
}

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

  const media = fullMedia && transformMedia(fullMedia)

  if (!text && !media) return

  const isFileMessage = checkIsFileMessage(text)
  const isParentFilesMessage = !isFileMessage && checkIsParentFilesMessage(text)

  return {
    id,
    parentId: isFileMessage ? parseFileMessage(text).parentId : undefined,
    isParent: isParentFilesMessage,
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

    if (!file?.access_hash || file?.has_stickers) return undefined

    const {
      id, date, access_hash, file_reference, dc_id,
      sizes, video_sizes,
      mime_type, size, attributes, thumbs, video_thumbs
    } = file
    const isPhoto = !!media.photo
    const type = isPhoto ? 'image/jpeg' : mime_type
    const name = isPhoto ? `photo-${date}.jpg` : (attributes?.find(({ _ }) => _ === 'documentAttributeFilename')?.file_name || '')
    const description = attributes?.find(({ _ }) => _ === 'documentAttributeAudio')
    const duration = attributes?.find(({ _ }) => ['documentAttributeAudio', 'documentAttributeVideo'].includes(_))?.duration
    const nameParts = name.split('.')
    const ext = nameParts[nameParts.length - 1]

    const filteredPhotos = (sizes || thumbs)?.filter(({ _ }) => _ === 'photoSize')
    const filteredPhotoSizes = filteredPhotos?.map(({ size }) => size)
    const originalPhoto = isPhoto ? filteredPhotos?.find(({ size }) => size === Math.max(...filteredPhotoSizes)) : undefined
    const originalSize = originalPhoto?.size || size
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
  return messages.sort((a, b) =>
    ((b[1].parentId || b[1].id) - (a[1].parentId || a[1].id)) ||
    (b[1].id - a[1].id)
  )
}

export const generateRandomId = () => {
  return `${Math.floor(Math.random() * 0xFFFFFFFF)}${Math.floor(Math.random() * 0xFFFFFF)}`.slice(0, 16)
}
