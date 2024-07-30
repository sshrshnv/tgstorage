import { expose, transfer } from 'comlink'

import { dataCache, resetDataCache } from '~/core/cache'
import { timer } from '~/tools/timer'
import { getNewsChannelInvite } from '~/tools/handle-channels'
import { getSponsorshipInvite } from '~/tools/handle-sponsorship'
import { FOLDER_POSTFIX, generateFolderName, stringifyFileMessage } from '~/tools/handle-content'
import { FILE_SIZE, getFilePartSize } from '~/tools/handle-file'

import type { MethodDeclMap, InputCheckPasswordSRP, ClientError } from './mtproto'
import { Client } from './mtproto'
import { handleUpdates } from './api.updates'
import {
  API_ID,
  API_HASH,
  IS_TEST,
  META_KEY,
  transformUser,
  transformMessage,
  transformSposoredMessage,
  sortMessages,
  generateRandomId
} from './api.helpers'

const THREAD_RESERVED_COUNT = 4

const initialMeta = {
  pfs: false,
  baseDC: 2,
  dcs: {},
  userID: ''
}

class Api {
  private client: Client

  private migratedDC: number

  private call: <K extends keyof MethodDeclMap>(
    method: K,
    data?: MethodDeclMap[K]['req'],
    params?: {
      dc?: number
      thread?: number
      timeout?: number
      attempt?: number
    }
  ) => Promise<any>

  private handleError: (error: ClientError & { method: string }) => void

  public async init() {
    const meta = await dataCache.getMeta(META_KEY, initialMeta)

    this.client = new Client({
      APIID: API_ID,
      APIHash: API_HASH,
      APILayer: 166,
      test: IS_TEST,
      debug: IS_TEST,
      dc: meta.baseDC,
      ssl: true,
      autoConnect: true,
      deviceModel: self.navigator.userAgent,
      meta
    })

    this.client.on('metaChanged', meta => dataCache.setMeta(META_KEY, meta))

    this.call = async (method, data = {}, { dc, thread, timeout, attempt = 0 } = {}) => {
      dc = dc || this.migratedDC

      if (timeout) {
        await timer(timeout)
      }

      return new Promise((resolve, reject) => this.client.call(method, data, { dc, thread }, async (err, res) => {
        if (!err) {
          resolve(res)
          return
        }

        this.handleError?.({ ...err, method })
        const { code, message = '' } = err

        if (code === 420) {
          const [, delay] = message.split('FLOOD_WAIT_')
          resolve(this.call(method, data, { dc, thread, timeout: +delay * 1000 }))
          return
        }

        if (code === 303) {
          const [_type, dcId] = message.split('_MIGRATE_')

          dc = +dcId
          this.client.cfg.dc = dc
          this.client.dc.setBaseDC(dc)
          this.migratedDC = dc

          resolve(this.call(method, data, { dc, thread }))

          const meta = await dataCache.getMeta(META_KEY, initialMeta)
          dataCache.setMeta(META_KEY, {
            ...meta,
            baseDC: dc
          })

          return
        }

        if (code >= 500) {
          resolve(this.call(method, data, { dc, thread, timeout: attempt * 100, attempt: ++attempt }))
          return
        }

        reject(err)
      }))
    }
  }

  public async listenErrors(callback) {
    this.handleError = (error: ClientError) => callback(error)
  }

  public async listenUpdates(callback) {
    this.client.updates.on(async (updates) => {
      const handledUpdates = await handleUpdates(updates)
      callback(handledUpdates)
    })
    this.fetchUpdatesState()

    const intervalId = self.setInterval(async () => {
      const user = await dataCache.getUser()
      if (user) {
        this.fetchUpdatesState()
      } else {
        self.clearInterval(intervalId)
      }
    }, 5 * 60 * 1000)
  }

  private async fetchUpdatesState() {
    this.client.updates.fetch(async (err, res) => {
      if (err || !res) return
      //this.fetchUpdates(callback, res)
    })
  }

  /*private async fetchUpdates(callback, {
    pts, qts, date, seq
  }: UpdatesState.updatesState) {
    if (!seq) return

    const {
      new_messages: messages,
      other_updates: updates,
      chats,
      state,
      intermediate_state
    } = await this.call('updates.getDifference', {
      pts, date, qts
    })
    if (!state || !intermediate_state) return

    const handledNewMessagesUpdates = await handleUpdates({ messages }, { new: true })
    callback(handledNewMessagesUpdates)

    const handledFoldersUpdates = await handleUpdates({ chats })
    callback(handledFoldersUpdates)

    const handledUpdates = await handleUpdates({ updates })
    callback(handledUpdates)

    if (intermediate_state) {
      this.fetchUpdates(callback, intermediate_state)
    }
  }*/

  public async getCountry() {
    return this.call('help.getNearestDc')
  }

  public async getCountries(
    lang_code: string
  ) {
    return this.call('help.getCountriesList', {
      lang_code,
      hash: 0
    })
  }

  public async sendCode(
    phone_number: string
  ) {
    return this.call('auth.sendCode', {
      api_id: API_ID,
      api_hash: API_HASH,
      phone_number,
      settings: {
        _: 'codeSettings'
      }
    })
  }

  public async resendCode(
    phone_number: string,
    phone_code_hash: string
  ) {
    return this.call('auth.resendCode', {
      phone_number,
      phone_code_hash
    })
  }

  public async signIn(
    phone_number: string,
    phone_code: string,
    phone_code_hash: string,
    country: string
  ) {
    const { user } = await this.call('auth.signIn', {
      phone_number,
      phone_code,
      phone_code_hash
    })
    const normalizedUser = await transformUser(user, country)
    dataCache.setUser(normalizedUser)
    return { user: normalizedUser }
  }

  public async checkPassword(
    password: string,
    country: string
  ) {
    const passwordAlgo = await this.call('account.getPassword')
    const passwordHash = await this.client.getPasswordKdf({ passwordAlgo, password })
    const { user } = await this.call('auth.checkPassword', {
      password: passwordHash as InputCheckPasswordSRP
    })
    const normalizedUser = await transformUser(user, country)
    dataCache.setUser(normalizedUser)
    return { user: normalizedUser }
  }

  private logouting = false
  public async logOut() {
    if (this.logouting) return
    this.logouting = true
    await this.call('auth.logOut')
    await resetDataCache()
    this.logouting = false
    return true
  }

  public async updateUser() {
    const [oldUser, oldMeta] = await Promise.all([
      dataCache.getUser(),
      dataCache.getMeta(META_KEY, initialMeta)
    ])

    const { user } = await this.call('users.getFullUser', {
      id: { _: 'inputUserSelf' }
    })
    const normalizedUser = await transformUser(user, oldUser?.country)
    dataCache.setUser(normalizedUser)
    dataCache.setMeta(META_KEY, {
      ...oldMeta,
      userID: user.id
    })
    dataCache.resetQueryTime()
    return { user: normalizedUser }
  }

  public async downloadPhotoFile({
    id,
    dc_id
  }) {
    let file = await this.call('upload.getFile', {
      location: {
        _: 'inputPeerPhotoFileLocation',
        peer: { _: 'inputPeerSelf' },
        photo_id: id
      },
      cdn_supported: false,
      limit: FILE_SIZE.MB1,
      offset: '',
    }, {
      dc: dc_id,
      thread: 2
    })

    const bytes = new Uint8Array(file.bytes)
    const type = file.type._.replace('storage.file', '').toLowerCase()
    file = undefined

    return transfer({ bytes, type }, [bytes.buffer])
  }

  public async getFolders() {
    const isQueryAvailable = await checkIsQueryAvailableByTime('getFolders')

    if (!isQueryAvailable) {
      return null
    }

    const searchChats = () => this.call('contacts.search', {
      q: FOLDER_POSTFIX,
      limit: 0
    })

    const loadChats = (offset_date = 0) => this.call('messages.getDialogs', {
      offset_peer: {
        _: 'inputPeerEmpty'
      },
      offset_id: 0,
      offset_date,
      limit: 100,
      hash: ''
    })

    // eslint-disable-next-line prefer-const
    let [search, loaded] = await Promise.all([
      searchChats(),
      loadChats()
    ])
    const chatIds = search.chats.map(({ id }) => id)
    const loadedChats = loaded.chats

    while (!(loadedChats.map(({ id }) => id)).some(id => chatIds.includes(id))) {
      loaded = await loadChats(loaded.messages[loaded.messages.length - 1].date)
      if (loaded.chats) loadedChats.push(loaded.chats)
      if (!loaded.messages.length) break
    }

    const user = await dataCache.getUser()

    return handleUpdates({ chats: [
      ...(user ? [{
        id: user.id,
        access_hash: user.access_hash,
        title: '',
        category: '',
        general: true
      }] : []),
      ...loadedChats,
      ...search.chats
    ]}, {
      offsetId: 0
    })
  }

  public async checkNewsChannelJoining() {
    const isQueryAvailable = await checkIsQueryAvailableByTime('checkNewsChannelJoining', 7 * 24 * 60 * 60)
    if (!isQueryAvailable) return { joiningAvailable: false }

    const newsChannelInvite = getNewsChannelInvite()
    if (!newsChannelInvite) return { joiningAvailable: false }

    const { _ } = await this.call('messages.checkChatInvite', {
      hash: newsChannelInvite
    })

    return {
      joined: _ === 'chatInviteAlready',
      joiningAvailable: true
    }
  }

  public async joinNewsChannel() {
    const isQueryAvailable = await checkIsQueryAvailableByTime('joinNewsChannel', 24 * 60 * 60)
    if (!isQueryAvailable) return

    const newsChannelInvite = getNewsChannelInvite()
    if (!newsChannelInvite) return

    const { _, chat } = await this.call('messages.checkChatInvite', {
      hash: newsChannelInvite
    })

    if (_ === 'chatInviteAlready') {
      return chat._ === 'channel' ? chat : undefined
    }

    const { chats } = await this.call('messages.importChatInvite', {
      hash: newsChannelInvite
    }).catch(() => ({ chats: [] }))

    return chats?.[0]
  }

  public async checkSponsorshipJoining() {
    //const isQueryAvailable = await checkIsQueryAvailableByTime('checkSponsorshipJoining', 12 * 60 * 60)
    //if (!isQueryAvailable) return { joiningAvailable: false }

    const sponsorshipInvite = getSponsorshipInvite()
    if (!sponsorshipInvite) return { joiningAvailable: false }

    const { _ } = await this.call('messages.checkChatInvite', {
      hash: sponsorshipInvite
    })

    return {
      joined: _ === 'chatInviteAlready',
      joiningAvailable: true
    }
  }

  public async createFolder(
    name: string
  ) {
    const updates = await this.call('channels.createChannel', {
      title: `${name}${FOLDER_POSTFIX}`,
      about: '',
      broadcast: true,
      megagroup: false
    })
    const handledUpdates = await handleUpdates(updates)
    const createdFolder = [...handledUpdates.folders!.values()].find(folder =>
      generateFolderName(folder.title, folder.group, folder.category) === name
    )
    this.archiveFolder(createdFolder)

    return handledUpdates
  }

  private async archiveFolder(
    folder?: {
      id: string
      access_hash: string
    }
  ) {
    if (!folder) return

    return this.call('folders.editPeerFolders', {
      folder_peers: [{
        _: 'inputFolderPeer',
        peer: {
          _: 'inputPeerChannel',
          channel_id: folder.id,
          access_hash: folder.access_hash
        },
        folder_id: 1
      }]
    })
  }

  public async editFolder(
    name: string,
    folder: {
      id: string
      access_hash: string
    }
  ) {
    const updates = await this.call('channels.editTitle', {
      channel: {
        _: 'inputChannel',
        channel_id: folder.id,
        access_hash: folder.access_hash
      },
      title: `${name}${FOLDER_POSTFIX}`
    })

    return handleUpdates(updates)
  }

  public async editGroup(
    newGroup: string,
    group: string,
    category: string
  ) {
    const folders = await dataCache.getFolders()
    const editableFolders = [...folders.values()].filter(folder => folder.group === group && folder.category === category)

    const updates = await Promise.all(editableFolders.map((folder, index) => this.call('channels.editTitle', {
      channel: {
        _: 'inputChannel',
        channel_id: folder.id,
        access_hash: folder.access_hash
      },
      title: `${generateFolderName(folder.title, newGroup, category)}${FOLDER_POSTFIX}`
    }, {
      timeout: (index % 2 ? index - 1 : index) * 2000
    })))

    for (let i = 0; i < updates.length; i++) {
      const handledUpdates = await handleUpdates(updates[i])

      if (i === updates.length - 1) {
        return handledUpdates
      }
    }
  }

  public async editCategory(
    newCategory: string,
    category: string
  ) {
    const folders = await dataCache.getFolders()
    const editableFolders = [...folders.values()].filter(folder => folder.category === category)

    const updates = await Promise.all(editableFolders.map((folder, index) => this.call('channels.editTitle', {
      channel: {
        _: 'inputChannel',
        channel_id: folder.id,
        access_hash: folder.access_hash
      },
      title: `${generateFolderName(folder.title, folder.group, newCategory)}${FOLDER_POSTFIX}`
    }, {
      timeout: (index % 2 ? index - 1 : index) * 2000
    })))

    for (let i = 0; i < updates.length; i++) {
      const handledUpdates = await handleUpdates(updates[i])

      if (i === updates.length - 1) {
        return handledUpdates
      }
    }
  }

  public async deleteFolder(
    folder: {
      id: string
      access_hash: string
    }
  ) {
    const updates = await this.call('channels.deleteChannel', {
      channel: {
        _: 'inputChannel',
        channel_id: folder.id,
        access_hash: folder.access_hash
      }
    })

    return handleUpdates(updates)
  }

  public async getMessages(
    folder: {
      id: string
      access_hash: string
    },
    lastMessageId?: number
  ) {
    const folderOffsetId = await dataCache.getFolderOffsetId(folder.id) || lastMessageId || 0
    const isQueryAvailable = folderOffsetId ?
      folderOffsetId !== 'end' :
      await checkIsQueryAvailableByTime(`getMessages-${folder.id}`, 30)

    if (!isQueryAvailable) {
      return null
    }

    const limit = 20
    const offsetId = folderOffsetId as number
    const user = await dataCache.getUser()

    const { messages } = await this.call('messages.getHistory', {
      peer: folder.id === user?.id ? {
        _: 'inputPeerSelf'
      } : {
        _: 'inputPeerChannel',
        channel_id: folder.id,
        access_hash: folder.access_hash
      },
      offset_id: offsetId,
      offset_date: 0,
      add_offset: 0,
      max_id: 0,
      min_id: 0,
      hash: '',
      limit
    })

    if (messages.length < limit) {
      dataCache.setFolderOffsetId(folder.id, 'end')
    } else {
      const lastMessage = messages[messages.length - 1]
      dataCache.setFolderOffsetId(folder.id, lastMessage.id)
    }

    return handleUpdates({ messages }, { offsetId })
  }

  public async getSponsoredMessage(
    folder: {
      id: string
      access_hash: string
    }
  ) {
    const user = await dataCache.getUser()
    if (folder.id === user?.id) {
      return null
    }

    const isQueryAvailable = await checkIsQueryAvailableByTime(`getSponsoredMessage-${folder.id}`, 5 * 60)
    if (!isQueryAvailable) {
      return dataCache.getFolderSponsoredMessage(folder.id)
    }

    const { messages, chats, users } = await this.call('channels.getSponsoredMessages', {
      channel: {
        _: 'inputChannel',
        channel_id: folder.id,
        access_hash: folder.access_hash
      }
    })
    const message = messages?.[0]
    if (!message) {
      return null
    }

    const normalizedSponsoredMessage = transformSposoredMessage(message, [...chats, ...users])
    dataCache.setFolderSponsoredMessage(folder.id, normalizedSponsoredMessage)

    return normalizedSponsoredMessage
  }

  public async markSponsoredMessage(
    message: {
      id: Uint8Array
    },
    folder: {
      id: string
      access_hash: string
    }
  ) {
    this.call('channels.viewSponsoredMessage', {
      random_id: message.id,
      channel: {
        _: 'inputChannel',
        channel_id: folder.id,
        access_hash: folder.access_hash
      }
    })
  }

  public async refreshMessages(
    folder: {
      id: string
      access_hash: string
    },
    ids: number[]
  ) {
    const user = await dataCache.getUser()
    const { messages } = await this.call(
      folder.id === user?.id ?
        'messages.getMessages' :
        'channels.getMessages',
      {
        id: ids.map(id => ({
          _: ('inputMessageID' as 'inputMessageID'),
          id
        })),
        ...(folder.id === user?.id ? {} : {
          channel: {
            _: 'inputChannel',
            channel_id: folder.id,
            access_hash: folder.access_hash
          }
        })
      }
    )

    return handleUpdates({ messages }, { edited: true })
  }

  public async createMessage(
    message: {
      text: string
      entities?: {
        type: any
        offset: number
        length: number
        url?: string
      }[]
      inputMedia?: {
        fileId: string
        fileName: string
        fileType: string
        isLarge: boolean
        partsCount: number
        imageParams?: {
          w: number
          h: number
        }
        videoParams?: {
          duration: number
          w: number
          h: number
        }
        thumb?: {
          fileId: string
          fileName: string
          fileType: string
          isLarge: boolean
          partsCount: number
        }
      }
      media?: {
        id: string
        access_hash: string
        file_reference: ArrayBuffer
        originalSizeType: string
      }
    },
    folder: {
      id: string
      access_hash: string
    }
  ) {
    const user = await dataCache.getUser()
    const updates = await this.call(
      (message.inputMedia || message.media) ?
        'messages.sendMedia' :
        'messages.sendMessage',
      {
        peer: folder.id === user?.id ? {
          _: 'inputPeerSelf'
        } : {
          _: 'inputPeerChannel',
          channel_id: folder.id,
          access_hash: folder.access_hash
        },
        message: message.text,
        entities: message.entities?.map(entity => ({
          _: entity.type,
          offset: entity.offset,
          length: entity.length,
          ...(entity.url ? { url: entity.url } : {})
        })),
        random_id: generateRandomId(),
        no_webpage: false,
        silent: true,
        ...(message.inputMedia ? { media: {
          _: 'inputMediaUploadedDocument',
          file: {
            _: message.inputMedia.isLarge ? 'inputFileBig' : 'inputFile',
            id: message.inputMedia.fileId,
            parts: message.inputMedia.partsCount,
            name: message.inputMedia.fileName,
            md5_checksum: message.inputMedia.isLarge ? undefined : ''
          },
          thumb: message.inputMedia.thumb ? {
            _: message.inputMedia.thumb.isLarge ? 'inputFileBig' : 'inputFile',
            id: message.inputMedia.thumb.fileId,
            parts: message.inputMedia.thumb.partsCount,
            name: message.inputMedia.thumb.fileName,
            md5_checksum: message.inputMedia.thumb.isLarge ? undefined : ''
          } : undefined,
          force_file: false,
          attributes: [{
            _: 'documentAttributeFilename',
            file_name: message.inputMedia.fileName
          }, ...(message.inputMedia.imageParams ? [{
            _: 'documentAttributeImageSize',
            ...message.inputMedia.imageParams
          }] : []), ...(message.inputMedia.videoParams ? [{
            _: 'documentAttributeVideo',
            round_message: false,
            supports_streaming: message.inputMedia.fileName.endsWith('mp4'),
            ...message.inputMedia.videoParams
          }] : []), ...(message.inputMedia.fileType.endsWith('gif') ? [{
            _: 'documentAttributeAnimated'
          }] : [])],
          mime_type: message.inputMedia.fileType,
          nosound_video: message.inputMedia.fileType.endsWith('gif')
        }} : {}),
        ...(message.media ? { media: message.media.originalSizeType ? {
          _: 'inputMediaPhoto',
          id: {
            _: 'inputPhoto',
            id: message.media.id,
            access_hash: message.media.access_hash,
            file_reference: message.media.file_reference
          }
        } : {
          _: 'inputMediaDocument',
          id: {
            _: 'inputDocument',
            id: message.media.id,
            access_hash: message.media.access_hash,
            file_reference: message.media.file_reference
          }
        }} : {})
      }
    )

    return handleUpdates(updates)
  }

  public async editMessage(
    message: {
      id: number
      text: string
      entities?: {
        type: any
        offset: number
        length: number
        url?: string
      }[]
      media?: {
        id: string
        access_hash: string
        file_reference: ArrayBuffer
        originalSizeType: string
      }
    },
    folder: {
      id: string
      access_hash: string
    }
  ) {
    const user = await dataCache.getUser()
    const updates = await this.call('messages.editMessage', {
      peer: folder.id === user?.id ? {
        _: 'inputPeerSelf'
      } : {
        _: 'inputPeerChannel',
        channel_id: folder.id,
        access_hash: folder.access_hash
      },
      id: message.id,
      message: message.text || undefined,
      entities: message.entities?.map(entity => ({
        _: entity.type,
        offset: entity.offset,
        length: entity.length,
        ...(entity.url ? { url: entity.url } : {})
      })),
      ...(message.media ? { media: message.media.originalSizeType ? {
        _: 'inputMediaPhoto',
        id: {
          _: 'inputPhoto',
          id: message.media.id,
          access_hash: message.media.access_hash,
          file_reference: message.media.file_reference
        }
      } : {
        _: 'inputMediaDocument',
        id: {
          _: 'inputDocument',
          id: message.media.id,
          access_hash: message.media.access_hash,
          file_reference: message.media.file_reference
        }
      }} : {}),
      no_webpage: false
    })

    return handleUpdates(updates)
  }

  public async deleteMessage(
    message: {
      id: number
      mediaMessages?: { id: number }[]
    },
    folder: {
      id: string
      access_hash: string
    }
  ) {
    const user = await dataCache.getUser()
    const ids = [message.id, ...(message.mediaMessages || []).map(({ id }) => id)]

    await this.call(
      folder.id === user?.id ?
        'messages.deleteMessages' :
        'channels.deleteMessages',
      folder.id === user?.id ? {
        id: ids
      } : {
        channel: {
          _: 'inputChannel',
          channel_id: folder.id,
          access_hash: folder.access_hash
        },
        id: ids
      }
    )

    return handleUpdates({ messages: ids.map((id) => ({
      _: 'message',
      id,
      peer_id: folder.id === user?.id ? {
        user_id: folder.id
      } : {
        channel_id: folder.id
      }
    }))}, {
      deleted: true
    })
  }

  public async moveMessage(
    message: {
      id: number
      text: string
      mediaMessages?: { id: number, message: string }[]
    },
    fromFolder: {
      id: string
      access_hash: string
    },
    toFolder: {
      id: string
      access_hash: string
    }
  ) {
    let updates = await this.createMessage(message, toFolder)

    if (!message.mediaMessages?.length) {
      return updates
    }

    const [[parentId]] = updates.foldersMessages?.get(toFolder.id) || new Map()

    updates = await this.refreshMessages(
      fromFolder,
      message.mediaMessages.map(({ id }) => id)
    )
    const folderMessages = updates.foldersMessages?.get(fromFolder.id)

    if (!folderMessages) {
      return updates
    }

    for (let i = 0; i < message.mediaMessages.length; i++) {
      const updates = await this.createMessage({
        ...folderMessages.get(message.mediaMessages[i].id),
        text: stringifyFileMessage('', parentId)
      }, toFolder)

      if (i === message.mediaMessages.length - 1) {
        return updates
      }
    }
  }

  public async prepareUploadingFile(
    fileMeta: {
      size: number
      name: string
      type: string
    }
  ) {
    const { size: fileSize, name: fileName, type: fileType } = fileMeta
    const fileId = generateRandomId()
    const isLarge = fileSize > FILE_SIZE.MB10
    const partSize = getFilePartSize(fileSize)
    const lastPartSize = fileSize % partSize || partSize
    const partsCount = Math.ceil(fileSize / partSize)

    return {
      fileId,
      fileName,
      fileType,
      isLarge,
      partSize,
      lastPartSize,
      partsCount
    }
  }

  public async uploadFilePart(
    filePartBytes: ArrayBuffer,
    params: {
      fileId: string
      isLarge: boolean
      part: number
      partsCount: number
      thread: number
    }
  ) {
    const { fileId, isLarge, part, partsCount, thread } = params

    return this.call(
      isLarge ?
        'upload.saveBigFilePart' :
        'upload.saveFilePart',
      {
        file_id: fileId,
        file_part: part,
        file_total_parts: partsCount,
        bytes: filePartBytes
      }, {
        thread: 2 + thread + THREAD_RESERVED_COUNT * 1
      }
    )
  }

  public async downloadFilePart({
    id,
    partSize,
    offsetSize,
    precise = true,
    dc_id,
    access_hash,
    file_reference,
    sizeType,
    originalSizeType,
    thread = 0
  }: {
    id: string
    partSize: number
    offsetSize: number
    precise?: boolean
    dc_id: number
    access_hash: string
    file_reference: ArrayBuffer
    sizeType?: string
    originalSizeType?: string
    thread?: number
  }) {
    let file = await this.call('upload.getFile', {
      location: {
        _: originalSizeType ? 'inputPhotoFileLocation' : 'inputDocumentFileLocation',
        id,
        access_hash,
        file_reference,
        thumb_size: sizeType || originalSizeType || ''
      },
      cdn_supported: false,
      limit: partSize,
      offset: offsetSize.toString(16).padStart(16, '0'),
      precise
    }, {
      dc: dc_id,
      thread: 2 + thread + THREAD_RESERVED_COUNT * 0
    })

    const bytes = new Uint8Array(file.bytes)
    file = undefined

    return transfer(bytes, [bytes.buffer])
  }

  public async searchMessages(
    query: string,
    folder: {
      id: string
      access_hash: string
    },
    addtional?: boolean
  ) {
    const offsetId = await dataCache.getSearchOffsetId()
    if (offsetId === 'end') return

    const limit = 20
    const user = await dataCache.getUser()

    const { messages } = await this.call('messages.search', {
      peer: folder.id === user?.id ? {
        _: 'inputPeerSelf'
      } : {
        _: 'inputPeerChannel',
        channel_id: folder.id,
        access_hash: folder.access_hash
      },
      filter: {
        _: 'inputMessagesFilterEmpty'
      },
      q: query,
      offset_id: offsetId,
      min_date: 0,
      max_date: 0,
      add_offset: 0,
      max_id: 0,
      min_id: 0,
      hash: '',
      limit
    })

    if (addtional) {
      return messages
    }

    let searchMessages = offsetId ?
      await dataCache.getSearchMessages() :
      new Map()
    const searchOffsetId = messages.length < limit ? 'end' : messages[messages.length - 1].id
    const parentIds: number[] = []

    messages.forEach(message => {
      message = transformMessage(message, user)

      if (!message || searchMessages.has(message.id)) return
      searchMessages.set(message.id, message)

      if (message.isParent) {
        parentIds.push(message.id)
      }
    })

    const additionalMessages = await Promise.all(parentIds.map(id =>
      this.searchMessages(
        stringifyFileMessage('', id),
        folder,
        true
      )
    ))

    additionalMessages.flat().forEach(imessage => {
      const message = transformMessage(imessage, user)
      if (!message) return
      searchMessages.set(imessage.id, message)
    })

    searchMessages = new Map(sortMessages([...searchMessages]))
    dataCache.setSearchMessages(searchMessages)
    dataCache.setSearchOffsetId(searchOffsetId)

    return searchMessages
  }

  public resetSearch() {
    dataCache.resetSearch()
  }

  public markMessageRead(
    folder: {
      id: string
      access_hash: string
    },
    messageIds: number[]
  ) {
    this.call('channels.readMessageContents', {
      channel: {
        _: 'inputChannel',
        channel_id: folder.id,
        access_hash: folder.access_hash
      },
      id: messageIds
    })
  }
}

const checkIsQueryAvailableByTime = async (queryTimeKey: string, time = 60) => {
  const queryTime = await dataCache.getQueryTime(queryTimeKey)

  if ((Date.now() - queryTime) < time * 1000) {
    return false
  }

  await dataCache.setQueryTime(queryTimeKey)

  return true
}


expose(Api)
