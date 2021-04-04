import { utf8encoder } from './utils'

/**
 * Type Language Serialization
 */
export default class Writer32 {
  buf: Uint32Array
  pos: number

  constructor(buf: Uint32Array, start = 0) {
    this.buf = buf
    this.pos = start
  }

  int32(number: number) {
    this.buf[this.pos++] = (
      (number >>> 24)
    ^ ((number >> 16) & 0xFF) << 8
    ^ ((number >> 8) & 0xFF) << 16
    ^ (number & 0xFF) << 24
    ) >>> 0
  }

  int64(number: string) {
    this.buf[this.pos++] = +`0x${number.slice(0, 8)}`
    this.buf[this.pos++] = +`0x${number.slice(8, 16)}`
  }

  long(number: string) {
    this.int32(+`0x${number.slice(8, 16)}`)
    this.int32(+`0x${number.slice(0, 8)}`)
  }

  int128(src: Uint32Array) {
    for (let i = 0; i < 4; i++) this.buf[this.pos++] = src[i]
  }

  int256(src: Uint32Array) {
    for (let i = 0; i < 8; i++) this.buf[this.pos++] = src[i]
  }

  double(float: number) {
    const buf = new Uint32Array(new Float64Array([float]))
    for (let i = 0; i < 2; i++) this.buf[this.pos++] = buf[i]
  }

  bytes(src: ArrayBuffer | SharedArrayBuffer | Uint8Array) {
    const buf = new Uint8Array(src)
    const len = buf.byteLength
    let i = 0

    if (len < 0xFE) {
      this.buf[this.pos++] = (
        len << 24
        ^ buf[i++] << 16
        ^ buf[i++] << 8
        ^ buf[i++]
      ) >>> 0
    } else {
      this.buf[this.pos++] = (0xFE000000
        ^ (len & 0xFF) << 16
        ^ ((len >> 8) & 0xFF) << 8
        ^ ((len >> 16) & 0xFF)
      ) >>> 0
    }

    for (; i < len; i += 4) {
      this.buf[this.pos++] = (
        buf[i] << 24
        ^ buf[i + 1] << 16
        ^ buf[i + 2] << 8
        ^ buf[i + 3]
      ) >>> 0
    }
  }

  string(text: string) {
    return this.bytes(utf8encoder.encode(text))
  }

  bool(flag: boolean) {
    return flag ? this.int32(0x997275b5) : this.int32(0xbc799737)
  }
}
