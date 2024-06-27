import { logs } from '../utils/log'
import { ClientInterface, PlainCallback } from './types'
import { UpdateDeclMap } from '../tl'

// debug helper
const debug = (client?: ClientInterface, ...rest: any[]) => {
  if (client && client.cfg.debug) logs('updates')(...rest)
}

export type UpdateListener<K extends keyof UpdateDeclMap> = (update: UpdateDeclMap[K]) => void

/**
 * Service class for handling update messages
 */
export default class UpdateService {
  /** Type Language Handler */
  client?: ClientInterface

  /** Subscribers */
  subscribers: Record<string, UpdateListener<any>[]>

  /** Subscriber on any update */
  subscriberAny?: UpdateListener<any>

  /**
   * Creates auth service object
   */
  constructor(client?: ClientInterface) {
    this.client = client
    this.subscribers = {}
  }

  /** Fetches update state */
  fetch(cb?: PlainCallback<'updates.getState'>) {
    if (!this.client) throw new Error('Unable to fetch updates without client instance')
    this.client.call('updates.getState', {}, cb)
  }

  /**
   * Calls specific callback on update
   */
  emit(update: any) {
    const listeners = this.subscribers[update._]
    if (listeners) {
      for (let i = 0; i < listeners.length; i += 1) listeners[i](update)
    }

    debug(this.client, update._)
  }

  /**
   * Calls special update events like mentioned users, chats, vectors
   */
  emitSpecial(predicate: string, data: any) {
    const listeners = this.subscribers[predicate]
    if (listeners) {
      for (let i = 0; i < listeners.length; i += 1) listeners[i](data)
    }
  }

  /**
   * Subscribes specific callback on update
   */
  on<K extends keyof UpdateDeclMap>(predicate: K, reciever: UpdateListener<K>): void
  on(reciever: UpdateListener<any>): void
  on(arg0: string | UpdateListener<any>, arg1?: UpdateListener<any>): void {
    if (typeof arg0 === 'string') {
      if (!this.subscribers[arg0]) this.subscribers[arg0] = []
      if (arg1) this.subscribers[arg0].push(arg1)
    } else {
      this.subscriberAny = arg0
    }
  }

  /**
   * Processes update messages
   * Ref: https://core.telegram.org/api/updates
   */
  process(updateMsg: any) {
    if (this.subscriberAny) this.subscriberAny(updateMsg)

    switch (updateMsg._) {
    // Ref: https://core.telegram.org/constructor/updateShort
    case 'updateShort':
      this.emit(updateMsg.update)
      break

    // Ref: https://core.telegram.org/type/Updates
    case 'updateShortMessage':
    case 'updateShortSentMessage':
    case 'updateShortChatMessage':
      this.emit(updateMsg)
      break

    // Ref: https://core.telegram.org/constructor/updates
    case 'updatesCombined':
    case 'updates':
      // process users
      if (updateMsg.users) {
        for (let i = 0; i < updateMsg.users.length; i += 1) {
          this.emitSpecial('user', updateMsg.users)
        }
      }

      // process chats
      if (updateMsg.chats) {
        for (let i = 0; i < updateMsg.chats.length; i += 1) {
          this.emitSpecial('chat', updateMsg.chats[i])
        }
      }

      // process updates
      if (updateMsg.updates) {
        for (let i = 0; i < updateMsg.updates.length; i += 1) {
          this.emit(updateMsg.updates[i])
        }
      }
      break

      // todo: handle updatesTooLong
      // Ref: https://core.telegram.org/api/updates#recovering-gaps

    default:
      debug(this.client, 'unknown', updateMsg._, updateMsg)
    }
  }
}
