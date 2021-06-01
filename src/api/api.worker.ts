import { expose } from 'comlink'

import { Client } from './mtproto'
import type { MethodDeclMap, InputFileLocation, InputCheckPasswordSRP } from './mtproto'
import { apiCache, checkIsQueryAvailableByTime } from './api.cache'
import { handleUpdates } from './api.updates'
import {
  API_ID,
  API_HASH,
  IS_TEST,
  FOLDER_POSTFIX,
  FILE_SIZE,
  wait,
  generateRandomId,
  generateFolderName,
  getFilePartSize
} from './api.helpers'

const initialMeta = {
  pfs: false,
  baseDC: 2,
  dcs: {},
  userID: 0
}

class Api {
  private client: Client
  private call: <K extends keyof MethodDeclMap>(
    method: K,
    data?: MethodDeclMap[K]['req'],
    params?: {
      dc?: number
      timeout?: number
    }
  ) => Promise<any>

  public async init() {
    const meta = await apiCache.getMeta(initialMeta)

    this.client = new Client({
      APIID: API_ID,
      APIHash: API_HASH,
      test: IS_TEST,
      dc: meta.baseDC,
      autoConnect: true,
      meta,
      debug: true
    })

    this.client.on('metaChanged', meta => apiCache.setMeta(meta))

    this.call = async (method, data = {}, { dc, timeout } = {}) => {
      if (timeout) {
        await wait(timeout)
      }

      return new Promise((resolve, reject) => this.client.call(method, data, { dc }, async (err, res) => {
        if (!err) {
          resolve(res)
          return
        }

        const { code, message = '' } = err

        if (code === 420) {
          const [, delay] = message.split('FLOOD_WAIT_')
          console.error(`==> FLOOD WAIT ${delay}: ${method}`)
          resolve(this.call(method, data, { dc, timeout: +delay * 1000 }))
          return
        }

        if (code === 303) {
          const [type, dcId] = message.split('_MIGRATE_')
          dc = +dcId

          if (type === 'PHONE') {
            this.client.dc.setBaseDC(dc)
          }

          resolve(this.call(method, data, { dc }))
          return
        }

        reject(err)
      }))
    }
  }

  public async listenUpdates(handler) {
    this.client.updates.on('updates', (message) => {
      handler(message)
    })
  }

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
    const normalizedUser = await this.normalizeUser(user, country)
    apiCache.setUser(normalizedUser)
    return { user: normalizedUser }
  }

  public async checkPassword(
    password: string,
    country: string
  ) {
    const passwordAlgo = await this.call('account.getPassword')
    const hash = await new Promise<object>(resolve =>
      this.client.getPasswordKdfAsync(passwordAlgo, password, resolve)
    )
    const { user } = await this.call('auth.checkPassword', {
      password: hash as InputCheckPasswordSRP
    })
    const normalizedUser = await this.normalizeUser(user, country)
    apiCache.setUser(normalizedUser)
    return { user: normalizedUser }
  }

  public async logOut() {
    await this.call('auth.logOut')
    apiCache.resetMeta()
    apiCache.resetUser()
    apiCache.resetFolders()
    apiCache.resetFoldersMessages()
    return true
  }

  private async normalizeUser(user, country) {
    if (!user) return null

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

    return {
      id: user.id,
      access_hash: user.access_hash,
      first_name: user.first_name,
      photo,
      country
    }
  }

  public async getFolders(loadedChats: any[] = []) {
    const isQueryAvailable = await checkIsQueryAvailableByTime('getFolders')

    if (!isQueryAvailable) {
      return null
    }

    const { _, chats } = await this.call('messages.getAllChats', {
      except_ids: loadedChats.map(chat => chat.id)
    })

    if (_ === 'chatsSlice') {
      return this.getFolders([...loadedChats, ...chats])
    }

    const user = await apiCache.getUser()

    return handleUpdates({ chats: [{
      id: user?.id,
      access_hash: user?.access_hash,
      title: '',
      category: '',
      general: true
    },
    ...loadedChats,
    ...chats
    ]})
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
      generateFolderName(folder.title, folder.category) === name
    )
    this.archiveFolder(createdFolder)

    return handledUpdates
  }

  private async archiveFolder(
    folder?: {
      id: number
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
      id: number
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

  public async editCategory(
    newCategory: string,
    category: string
  ) {
    const folders = await apiCache.getFolders()
    const editableFolders = [...folders.values()].filter(folder => folder.category === category)

    const updates = await Promise.all(editableFolders.map((folder, index) => this.call('channels.editTitle', {
      channel: {
        _: 'inputChannel',
        channel_id: folder.id,
        access_hash: folder.access_hash
      },
      title: `${generateFolderName(folder.title, newCategory)}${FOLDER_POSTFIX}`
    }, {
      timeout: (index % 2 ? index - 1 : index) * 1500
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
      id: number
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
      id: number
      access_hash: string
    },
    offsetId = 0
  ) {
    const isQueryAvailable = !!offsetId || await checkIsQueryAvailableByTime(`getMessages-${folder.id}`, 30)

    if (!isQueryAvailable) {
      return null
    }

    const user = await apiCache.getUser()
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
      hash: 0,
      limit: 20
    })

    return handleUpdates({ messages }, { offsetId })
  }

  public async createMessage(
    message: {
      text: string
      media?: any
    },
    folder: {
      id: number
      access_hash: string
    }
  ) {
    const user = await apiCache.getUser()
    const updates = await this.call(
      message.media ?
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
        media: message.media,
        message: message.text,
        random_id: generateRandomId(),
        no_webpage: false,
        silent: true
      }
    )

    // 400 	MESSAGE_EMPTY
    // 400 	MESSAGE_TOO_LONG

    // 400 	WEBPAGE_CURL_FAILED
    // 400 	WEBPAGE_MEDIA_EMPTY

    return handleUpdates(updates)
  }

  public async editMessage(
    message: {
      id: number
      text: string
      media?: any
    },
    folder: {
      id: number
      access_hash: string
    }
  ) {
    const user = await apiCache.getUser()
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
      media: message.media,
      no_webpage: false
    })

    return handleUpdates(updates)
  }

  public async deleteMessage(
    message: {
      id: number
    },
    folder: {
      id: number
      access_hash: string
    }
  ) {
    const user = await apiCache.getUser()
    await this.call(
      folder.id === user?.id ?
        'messages.deleteMessages' :
        'channels.deleteMessages',
      folder.id === user?.id ? {
        id: [message.id]
      } : {
        channel: {
          _: 'inputChannel',
          channel_id: folder.id,
          access_hash: folder.access_hash
        },
        id: [message.id]
      }
    )

    return handleUpdates({ messages: [{
      _: 'message',
      id: message.id,
      peer_id: folder.id === user?.id ? {
        user_id: folder.id
      } : {
        channel_id: folder.id
      }
    }]}, {
      deleted: true
    })
  }

  public async uploadFile(
    file: File,
    onUploadPart: () => void
  ) {
    const { size: fileSize } = file
    const fileId = generateRandomId()
    const isLarge = fileSize > FILE_SIZE.MB10
    const partSize = getFilePartSize(fileSize)
    const lastPartSize = fileSize % partSize
    const partsCount = Math.ceil(fileSize / partSize)

    const fileData: Uint8Array = await new Promise(resolve => {
      const reader = new FileReader()
      reader.readAsArrayBuffer(file)
      reader.onload = () => {
        resolve(new Uint8Array(reader.result as ArrayBuffer))
      }
    })

    for (let part = 0; part < partsCount; part++) {
      const uploaded = part * partSize
      const uploading = part === partsCount - 1 ? lastPartSize : partSize

      await this.uploadFilePart(
        isLarge,
        fileId,
        part,
        fileData.subarray(uploaded, uploaded + uploading),
        partsCount
      )
    }
  }

  private async uploadFilePart(
    isLarge: boolean,
    file_id: string,
    file_part: number,
    bytes: ArrayBuffer,
    file_total_parts?: number
  ) {
    return await this.call(
      isLarge ?
        'upload.saveBigFilePart' :
        'upload.saveFilePart',
      {
        file_id,
        file_part,
        file_total_parts,
        bytes
      }
    )
  }

  public async getFile(
    location: InputFileLocation,
    dcId: number
  ) {
    const file = await this.call('upload.getFile', {
      location,
      cdn_supported: false,
      limit: 1048576, // 1MB
      offset: 0
    }, {
      dc: dcId
    })
    const type = file.type._.replace('storage.file', '').toLowerCase()
    return {
      bytes: file.bytes,
      type
    }
  }
}

expose(Api)
