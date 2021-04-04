import { expose } from 'comlink'
import { get, set } from 'idb-keyval'

import { Client } from './mtproto'
import type { MethodDeclMap, InputFileLocation, InputCheckPasswordSRP } from './mtproto'

const API_ID = +(process.env.API_ID || '')
const API_HASH = `${process.env.API_HASH || ''}`
const IS_TEST = `${process.env.API_TEST || ''}` !== 'false'
const META_KEY = IS_TEST ? 'metatest' : 'meta'
const FOLDER_POSTFIX = '::tgs'

const initialMeta = {
  pfs: false,
  baseDC: 2,
  dcs: {},
  userId: 0
}

class Api {
  private client: Client
  private call: <K extends keyof MethodDeclMap>(method: K, data?: MethodDeclMap[K]['req'], dc?: number) => Promise<any>

  public async init() {
    const meta = await get(META_KEY) || initialMeta

    this.client = new Client({
      APIID: API_ID,
      APIHash: API_HASH,
      test: IS_TEST,
      dc: meta.baseDC,
      autoConnect: true,
      meta,
      debug: true
    })

    this.client.on('metaChanged', meta => set(META_KEY, meta))

    this.call = (method, data = {}, dc) => {
      return new Promise((resolve, reject) => this.client.call(method, data, { dc }, async (err, res) => {
        if (!err) {
          resolve(res)
          return
        }

        const { code, message = '' } = err

        if (code === 420) {
          const [, delay] = message.split('FLOOD_WAIT_')
          console.info(`!! FLOOD WAIT ${delay}`)

          await wait(+delay * 1000)

          return this.call(method, data, dc)
        }

        if (code === 303) {
          const [type, dcId] = message.split('_MIGRATE_')
          dc = +dcId

          if (type === 'PHONE') {
            this.client.dc.setBaseDC(dc)
          }

          return this.call(method, data, dc)
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
    phone_code_hash: string
  ) {
    const { user } = await this.call('auth.signIn', {
      phone_number,
      phone_code,
      phone_code_hash
    })
    const normalizedUser = await this.normalizeUser(user)
    return { user: normalizedUser }
  }

  public async signUp(
    phone_number: string,
    phone_code_hash: string,
    first_name: string,
    last_name = ''
  ) {
    return this.call('auth.signUp', {
      phone_number,
      phone_code_hash,
      first_name,
      last_name
    })
  }

  public async logOut() {
    await this.call('auth.logOut')
    set(META_KEY, null)
    return true
  }

  public async checkPassword(
    password: string
  ) {
    const passwordAlgo = await this.call('account.getPassword')
    const hash = await new Promise<object>(resolve =>
      this.client.getPasswordKdfAsync(passwordAlgo, password, resolve)
    )
    const { user } = await this.call('auth.checkPassword', {
      password: hash as InputCheckPasswordSRP
    })
    const normalizedUser = await this.normalizeUser(user)
    return { user: normalizedUser }
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
    }, dcId)
    const type = file.type._.replace('storage.file', '').toLowerCase()
    return {
      bytes: file.bytes,
      type
    }
  }

  public async getUser() {
    const { user } = await this.call('users.getFullUser', {
      id: { _: 'inputUserSelf' }
    })
    const normalizedUser = await this.normalizeUser(user)
    return { user: normalizedUser }
  }

  private async normalizeUser(user) {
    if (!user) {
      return null
    }

    let photo: { bytes: Uint8Array, type: string } | null = null
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
      photo
    }
  }

  public async getGeneralFolder() {
    return this.call('messages.getPeerDialogs', {
      peers: [{
        _: 'inputDialogPeer',
        peer: {
          _: 'inputPeerSelf'
        }
      }]
    })
  }

  public async getFolders() {
    const { chats } = await this.call('messages.getAllChats', {
      except_ids: []
    })
    const filteredFolders = chats
      .filter(({ _, title, left }) => (
        _ === 'channel' &&
        title.endsWith(FOLDER_POSTFIX) &&
        !left
      ))
      .map(chat => convertChatToFolder(chat))
    return sortFolders(filteredFolders)
  }

  public async createFolder(
    title: string,
    folders
  ) {
    const { chats } = await this.call('channels.createChannel', {
      title: `${title}${FOLDER_POSTFIX}`,
      about: '',
      broadcast: true,
      megagroup: false
    })
    const folder = convertChatToFolder(chats[0])
    await this.archiveFolder(folder)
    return sortFolders([
      ...folders,
      folder
    ])
  }

  public async archiveFolder(
    folder: {
      id: number
      access_hash: string
    }
  ) {
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

  public getMessages() {
    return 'test'
  }
}

const wait = delay => new Promise(resolve => setTimeout(resolve, delay))

const convertChatToFolder = chat => {
  const [title, category] = chat.title
    .replace(FOLDER_POSTFIX, '')
    .split('::')
    .slice(0, 2)

  return {
    id: chat.id,
    access_hash: chat.access_hash,
    title,
    category: category || ''
  }
}

const sortFolders = folders => folders.sort((a, b) =>
  new Intl.Collator(undefined, { sensitivity: 'base' }).compare(a.category, b.category) ||
  new Intl.Collator(undefined, { sensitivity: 'base' }).compare(a.title, b.title)
)

expose(Api)
