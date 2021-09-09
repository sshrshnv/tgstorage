import sha256 from '@cryptography/sha256'
import { IGE } from '@cryptography/aes'
import PlainMessage from './plain'
// eslint-disable-next-line
import EncryptedMessage from './encrypted';
import { Writer32, Reader32, randomize } from '../serialization'
import { parse } from '../tl'

/**
 * Message is a buffer with 32 byte padding, which should be encrypted.
 * Ref: https://core.telegram.org/mtproto/description#encrypted-message-encrypted-data
 */
export default class Message {
  /** Byte data source of message */
  buf: Uint32Array

  _writer: Writer32
  _reader: Reader32

  /** Length of message headers */
  hlen = 8

  /** Padding length */
  plen = 0

  /** If message is content related */
  isContentRelated = true

  /**
   * Creates new Bytes object from:
   * - Uint32Array
   */
  constructor(src: Uint32Array, shouldWrap = false) {
    if (shouldWrap) {
      this.plen = this.getPaddingLen(src.length)
      this.buf = new Uint32Array(this.hlen + src.length + this.plen)
      this._writer = new Writer32(this.buf)

      this.len()
      this.padding()
      for (let i = 0; i < src.length; i++) this.buf[this.hlen + i] = src[i]
    } else {
      this.buf = src
      this._writer = new Writer32(this.buf)
    }

    this._reader = new Reader32(this.buf)
  }

  getPaddingLen(len: number) {
    return 8 - (len % 4)
  }

  // // eslint-disable-next-line
  // getPaddingLen(len: number) {
  //   return 32 - (len % 16); // + Math.floor(Math.random() * 20) * 16;
  // }

  /**
   * Method sets message identificator it to the 16-24 bytes
   */
  set id(id: string) {
    this._writer.pos = 4
    this._writer.long(id)
  }

  /**
   * Method gets message identificator from the 16-24 bytes
   */
  get id(): string {
    this._reader.pos = 4
    return this._reader.long()
  }

  /**
   * Method sets 28-32 bytes with message_data_length
   */
  len(): void {
    this._writer.pos = 7
    this._writer.int32((this.buf.length - this.hlen - this.plen) * 4)
  }

  get dataLength(): number {
    this._reader.pos = 7
    return this._reader.int32() / 4
  }

  /**
   * Method sets first 8 bytes with salt header
   */
  set salt(salt: string) {
    this._writer.pos = 0
    this._writer.long(salt)
  }

  /**
   * Method sets second 8-16 bytes with session_id header
   */
  set sessionID(sid: string) {
    this._writer.pos = 2
    this._writer.long(sid)
  }

  /**
   * Method sets 24-28 bytes with seq_no header
   */
  set seqNo(seq: number) {
    this._writer.pos = 6
    this._writer.int32(seq)
  }

  /**
   * Method gets 24-28 bytes with seq_no header
   */
  get seqNo(): number {
    this._reader.pos = 6
    return this._reader.int32()
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
   * Method gets encrypted_data starts 32 byte
   */
  get data(): Uint32Array {
    return this.buf.subarray(this.hlen, this.hlen + this.dataLength)
  }

  /**
   * Method sets padding bytes with random data
   */
  padding() {
    randomize(this.buf, this.buf.length - this.plen)
  }

  // for debug purpose
  get parsed(): any {
    return parse(this.reader)
  }

  static SyncServerTime(correctId: string): number {
    return PlainMessage.SyncServerTime(correctId)
  }

  /**
   * Generates unique message identificator depending on current time
   */
  static GenerateID(): string {
    return PlainMessage.GenerateID()
  }

  /**
   * Encrypts MessageData object with AES-256-IGE mode.
   * https://core.telegram.org/mtproto/description#protocol-description
   */
  encrypt(key: Uint32Array, authKeyID: string): EncryptedMessage {
    const msgKeyLarge = sha256.stream().update(key.subarray(22, 30)).update(this.buf).digest()
    const msgKey = msgKeyLarge.subarray(2, 6)
    const sha256a = sha256.stream().update(msgKey).update(key.subarray(0, 9)).digest()
    const sha256b = sha256.stream().update(key.subarray(10, 19)).update(msgKey).digest()

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
    const encrypted = cipher.encrypt(this.buf)
    const encMsg = new EncryptedMessage(encrypted, true)

    encMsg.authKey = authKeyID
    encMsg.key = msgKey

    return encMsg
  }
}
