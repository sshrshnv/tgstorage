/* eslint-disable prefer-destructuring */
import sha256 from '@cryptography/sha256'
import { IGE } from '@cryptography/aes'
import Message from './message'
import { Writer32, Reader32, i2ab } from '../serialization'

/**
 * MessageEncrypted is a buffer with 24 byte padding, which has been encrypted.
 * Ref: https://core.telegram.org/mtproto/description#encrypted-message
 */
export default class EncryptedMessage {
  /** Byte data source of message */
  buf: Uint32Array

  _writer: Writer32
  _reader: Reader32

  /** Length of message headers */
  hlen = 6

  /** If message is content related */
  isContentRelated = true

  constructor(src: Uint32Array, shouldWrap = false) {
    if (shouldWrap) {
      this.buf = new Uint32Array(this.hlen + src.length)
      this._writer = new Writer32(this.buf)

      for (let i = 0; i < src.length; i++) this.buf[this.hlen + i] = src[i]
    } else {
      this.buf = src
      this._writer = new Writer32(this.buf)
    }

    this._reader = new Reader32(this.buf)
  }

  /**
   * Method sets authKey to the first 8 bytes
   */
  set authKey(authKeyID: string) {
    this._writer.pos = 0
    this._writer.long(authKeyID)
  }

  /**
   * Method gets authKey to the first 8 bytes
   */
  get authKey(): string {
    this._reader.pos = 0
    return this._reader.long()
  }

  /**
   * Method sets 8-24 bytes with msg_key
   */
  set key(msgKey: Uint32Array) {
    this._writer.pos = 2
    this._writer.int128(msgKey)
  }

  /**
   * Method gets hex string from 8-24 bytes
   */
  get key(): Uint32Array {
    this._reader.pos = 2
    return this._reader.int128()
  }

  /**
   * Method gets data payload
   */
  get data(): Uint32Array {
    return this.buf.subarray(6)
  }

  /**
   * Method gets writer for buffer
   */
  get writer(): Writer32 {
    this._writer.pos = this.hlen
    return this._writer
  }

  /**
   * Method gets reader for buffer
   */
  get reader(): Reader32 {
    this._reader.pos = this.hlen
    return this._reader
  }

  /**
   * Decrypts MessageEncrypted object with AES-256-IGE mode.
   * https://core.telegram.org/mtproto/description#protocol-description
   */
  decrypt(key: Uint32Array): Message {
    const msgKey = this.key
    const sha256a = sha256.stream().update(msgKey).update(key.subarray(2, 11)).digest()
    const sha256b = sha256.stream().update(key.slice(12, 21)).update(msgKey).digest()

    const a2 = sha256a[2]
    const a3 = sha256a[3]
    const a4 = sha256a[4]
    const a5 = sha256a[5]

    for (let i = 2; i < 6; i++) sha256a[i] = sha256b[i]

    sha256b[2] = a2
    sha256b[3] = a3
    sha256b[4] = a4
    sha256b[5] = a5

    const cipher = new IGE(sha256a, sha256b)
    return new Message(cipher.decrypt(this.data))
  }

  get arrayBuffer(): ArrayBuffer | SharedArrayBuffer {
    return i2ab(this.buf)
  }
}
