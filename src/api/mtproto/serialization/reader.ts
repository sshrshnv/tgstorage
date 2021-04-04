import { i2h, utf8decoder } from './utils'

/**
 * Type Language Deserialization
 */
export default class Reader32 {
  private buf: Uint32Array
  pos: number

  constructor(buf: Uint32Array, start = 0) {
    this.buf = buf
    this.pos = start
  }

  int32() {
    const uint = this.buf[this.pos++]

    return (
      (uint >>> 24)
    ^ ((uint >> 16) & 0xFF) << 8
    ^ ((uint >> 8) & 0xFF) << 16
    ^ (uint & 0xFF) << 24
    ) >>> 0
  }

  int64() {
    return i2h(this.buf[this.pos++]) + i2h(this.buf[this.pos++])
  }

  long() {
    const lo = this.int32()
    const hi = this.int32()
    return i2h(hi) + i2h(lo)
  }

  int128() {
    this.pos += 4
    return this.buf.subarray(this.pos - 4, this.pos)
  }

  int256() {
    this.pos += 8
    return this.buf.subarray(this.pos - 8, this.pos)
  }

  double() {
    this.pos += 2

    const int8 = new Uint8Array([
      this.buf[this.pos - 2] >>> 24,
      (this.buf[this.pos - 2] >> 16) & 0xFF,
      (this.buf[this.pos - 2] >> 8) & 0xFF,
      (this.buf[this.pos - 2]) & 0xFF,
      this.buf[this.pos - 1] >>> 24,
      (this.buf[this.pos - 1] >> 16) & 0xFF,
      (this.buf[this.pos - 1] >> 8) & 0xFF,
      (this.buf[this.pos - 1]) & 0xFF,
    ])

    return new Float64Array(int8.buffer)[0]
  }

  bytes() {
    let buffer
    let int32 = this.buf[this.pos++]
    let len = int32 >>> 24
    let i = 0

    if (len >= 0xFE) {
      int32 &= 0xFFFFFF
      len = int32 >>> 16
        ^ ((int32 >> 8) & 0xFF) << 8
        ^ (int32 & 0xFF) << 16

      buffer = new Uint8Array(len)
    } else {
      buffer = new Uint8Array(len)
      buffer[i++] = (int32 >> 16) & 0xFF
      buffer[i++] = (int32 >> 8) & 0xFF
      buffer[i++] = (int32) & 0xFF
    }

    for (; i < len; i += 4) {
      int32 = this.buf[this.pos++]
      buffer[i] = int32 >>> 24
      buffer[i + 1] = (int32 >> 16) & 0xFF
      buffer[i + 2] = (int32 >> 8) & 0xFF
      buffer[i + 3] = int32 & 0xFF
    }

    return buffer.buffer
  }

  string() {
    return utf8decoder.decode(this.bytes())
  }

  bool() {
    return this.int32() === 0x997275b5
  }

  rollback() {
    this.pos--
  }
}
