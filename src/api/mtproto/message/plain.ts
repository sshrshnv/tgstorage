/* eslint-disable no-mixed-operators */
import { bi } from '../utils/bigint'
import { Writer32, Reader32, i2h, i2ab } from '../serialization'
import { parse } from '../tl'

let lastGeneratedLo = 0
let lastGeneratedHi = 0
let serverTimeOffset = 0

/**
 * MessagePlain is a buffer with 20 byte padding, which should not be encrypted.
 * Ref: https://core.telegram.org/mtproto/description#unencrypted-message
 */
export default class PlainMessage {
  /** Byte data source of message */
  buf: Uint32Array

  _writer: Writer32
  _reader: Reader32

  /** Length of message headers */
  hlen = 5

  /** Message nonce */
  nonce: Uint32Array

  /**
   * Creates new Bytes object from:
   * - AraryBuffer
   * - TLConstructor
   */
  constructor(src: Uint32Array, shouldWrap = false) {
    this.buf = src

    if (shouldWrap) {
      this.buf = new Uint32Array(this.hlen + src.length)
      this._writer = new Writer32(this.buf)
      this.len()

      for (let i = 0; i < src.length; i++) this.buf[this.hlen + i] = src[i]
    } else {
      this.buf = src
      this._writer = new Writer32(this.buf)
    }

    this._reader = new Reader32(this.buf)
    this._reader.pos = 6
    this.nonce = this._reader.int128()
  }

  /**
   * Method sets message identificator it to the 8-16 bytes
   */
  set id(id: string) {
    this._writer.pos = 2
    this._writer.long(id)
  }

  /**
   * Method gets message identificator from the 8-16 bytes
   */
  get id(): string {
    this._reader.pos = 2
    return this._reader.long()
  }

  /**
   * Method sets 16-20 bytes with message_data_length
   */
  len(): void {
    this._writer.pos = 4
    this._writer.int32((this.buf.length - this.hlen) * 4)
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
    return this.buf.subarray(this.hlen)
  }

  // for debug purpose
  get parsed(): any {
    return parse(this.reader)
  }

  static SyncServerTime(correctId: string) {
    const oldServerTimeOffset = serverTimeOffset
    const nowTime = Math.floor(Date.now() / 1000)
    const correctTime = bi(parseInt(correctId, 16)) >> bi(32)
    serverTimeOffset = Number(correctTime) - nowTime

    if (serverTimeOffset !== oldServerTimeOffset) {
      lastGeneratedHi = 0
      lastGeneratedLo = 0
    }

    return serverTimeOffset
  }

  /**
   * Generates unique message identificator depending on current time
   */
  static GenerateID(): string {
    const time = Date.now() + serverTimeOffset * 1000
    const nanosecond = Math.floor(time % 1000)
    const second = Math.floor(time / 1000)

    let generatedHi = second
    let generatedLo = (nanosecond << 20 | nanosecond << 8 | 4)

    // avoid collisions
    if (lastGeneratedHi > generatedHi || (lastGeneratedHi === generatedHi && lastGeneratedLo >= generatedLo)) {
      generatedHi = lastGeneratedHi
      generatedLo = lastGeneratedLo + 4
    }

    lastGeneratedHi = generatedHi
    lastGeneratedLo = generatedLo

    return i2h(generatedHi) + i2h(generatedLo)
  }

  get arrayBuffer(): ArrayBuffer | SharedArrayBuffer {
    return i2ab(this.buf)
  }
}
