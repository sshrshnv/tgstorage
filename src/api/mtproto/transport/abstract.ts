import { PlainMessage, EncryptedMessage, ErrorMessage } from '../message'
import { Transports } from '../client/types'

/** Generic config for mtproto transport classes */
export type TransportConfig = {
  dc: number
  thread: number
  host: string
  test: boolean
  ssl: boolean
  debug: boolean
  transport: Transports
}

export type TransportState = 'connected' | 'disconnected' | 'waiting'
export type TransportCallback = (cfg: TransportConfig, msg: TransportState | ErrorMessage | EncryptedMessage | PlainMessage) => void

/**
 * Abstract class for all mtproto transport classes
 */
export default class Transport {
  /** Instance transport */
  transport = ''

  /** Message listener */
  pass: TransportCallback

  /** Transport config */
  cfg: TransportConfig

  /**
   * Creates abstract transport object
   */
  constructor(pass: TransportCallback, cfg: TransportConfig) {
    this.pass = pass
    this.cfg = cfg
  }

  send(_msg: PlainMessage | EncryptedMessage) {
    throw new Error('Unable to send packet with generic transport')
  }
}
