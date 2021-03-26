import { MTProto, getSRPParams } from '@mtproto/core'
import { get, set } from 'idb-keyval'

export class Api {
  private mtproto: MTProto
  private call: (method: string, params?: object, options?: { dcId: number }) => any

  constructor() {
    this.mtproto = new MTProto({
      api_id: +(process.env.API_ID || ''),
      api_hash: `${process.env.API_HASH || ''}`,
      test: `${process.env.API_TEST || ''}` !== 'false',
      customLocalStorage: {
        setItem: (key: string, value: any) => set(key, value),
        getItem: (key: string) => new Promise(async resolve => {
          const value = await get(key)
          resolve(value || null)
        })
      }
    })

    this.call = (method, params = {}, options) => {
      return this.mtproto.call(method, params, options).catch(async error => {
        const { error_code, error_message } = error

        if (error_code === 420) {
          const [, delay] = error_message.split('FLOOD_WAIT_')
          await wait(delay * 1000)
          return this.call(method, params, options)
        }

        if (error_code === 303) {
          const [type, dcId] = error_message.split('_MIGRATE_')

          if (type === 'PHONE') {
            await this.mtproto.setDefaultDc(+dcId)
          } else {
            options = { ...options, dcId: +dcId }
          }

          return this.call(method, params, options)
        }

        return Promise.reject(error)
      })
    }
  }

  public async listenUpdates(handler) {
    this.mtproto.updates.on('updates', (message) => {
      handler(message)
    })
  }

  public async getCountry() {
    return this.call('help.getNearestDc')
  }

  public async getCountries() {
    return this.call('help.getCountriesList')
  }

  public async sendCode(
    phone_number: string
  ) {
    return this.call('auth.sendCode', {
      phone_number,
      settings: {
        _: 'codeSettings'
      }
    })
  }

  public async signIn(
    phone_number: string,
    phone_code: string,
    phone_code_hash: string
  ) {
    return this.call('auth.signIn', {
      phone_number,
      phone_code,
      phone_code_hash
    })
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
    return this.call('auth.logOut')
  }

  public async checkPassword(
    password: string
  ) {
    const { srp_id, current_algo, srp_B } = await this.call('account.getPassword')
    const { g, p, salt1, salt2 } = current_algo
    const { A, M1 } = await getSRPParams({ g, p, salt1, salt2, gB: srp_B, password })

    return this.call('auth.checkPassword', {
      password: {
        _: 'inputCheckPasswordSRP',
        srp_id,
        A,
        M1
      }
    })
  }

  public async getFile(
    location: object,
    options: {
      dcId: number
    }
  ) {
    const file = await this.call('upload.getFile', {
      location,
      cdn_supported: false,
      limit: 1048576, // 1MB
      offset: 0
    }, options)
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
    let photo: { bytes: Uint8Array, type: string } | null = null

    if (user.photo?.photo_id) {
      photo = await this.getFile({
        _: 'inputPeerPhotoFileLocation',
        peer: { _: 'inputPeerSelf' },
        volume_id: user.photo.photo_small.volume_id,
        local_id: user.photo.photo_small.local_id
      }, {
        dcId: user.photo.dc_id
      })
    }

    return {
      id: user.id,
      access_hash: user.access_hash,
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
    return this.call('messages.getAllChats', {
      except_ids: []
    }).then(({ chats }) => {
      chats = chats.filter(({ _, title, left }) => (
        _ === 'channel' &&
        title.endsWith('::tgstorage') &&
        !left
      ))
      return chats.map(chat => {
        const [title, group] = chat.title.split('::').slice(0, 2)
        return {
          id: chat.id,
          access_hash: chat.access_hash,
          title,
          group
        }
      })
    })
  }

  public getMessages() {
    //
  }
}

const wait = delay => new Promise(resolve => setTimeout(resolve, delay))
