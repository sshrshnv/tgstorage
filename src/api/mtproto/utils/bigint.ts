/*
  Based on:
  https://github.com/juanelas/bigint-mod-arith
  https://github.com/juanelas/bigint-crypto-utils
*/

type TypedArrayConstructor = Uint8ArrayConstructor | Uint32ArrayConstructor
type TypedArray = Uint8Array | Uint32Array

export const bi = (value: string | number | bigint | boolean) => {
  return self.BigInt(value)
}

export const biFromTA = (typedArray: TypedArray) => {
  const bits = self.BigInt(typedArray.BYTES_PER_ELEMENT * 8)
  let val = 0n
  for (const i of typedArray.values()) {
    const b = bi(i)
    val = (val << bits) + b
  }
  return val
}

export const biToTA = <T>(
  b: bigint,
  typedArrayConstructor: TypedArrayConstructor
): T => {
  const bytes = typedArrayConstructor.BYTES_PER_ELEMENT
  let hex = b.toString(16)
  if (hex.length % 2) {
    hex = '0' + hex
  }
  const length = hex.length / (2 * bytes)
  const typedArray = new typedArrayConstructor(length)
  let i = 0
  let j = 0
  while (i < length) {
    typedArray[i] = parseInt(hex.slice(j, j + 2 * bytes), 16)
    i += 1
    j += 2 * bytes
  }
  return (typedArray as unknown) as T
}

export const biMod = (b: bigint, p: bigint) => {
  return b % p
}

export const biModPow = (b: bigint, exponent: bigint, modulus: bigint) => {
  if (b === 0n || modulus === 0n || modulus === 1n) return 0n
  if (exponent === 0n) return 1n
  let result = 1n
  while (exponent > 0n) {
    if ((exponent & 1n) === 1n) {
      result = (result * b) % modulus
    }
    exponent >>= 1n
    b = (b * b) % modulus
  }
  return result
}

export const biRandom = (min: bigint, max: bigint) => {
  const interval = max - min
  const bitLen = bitLength(interval)
  let rnd: bigint
  do {
    const buf = randomBits(bitLen)
    rnd = fromBuffer(buf)
  } while (rnd > interval)
  return rnd + min
}

export const biGCD = (a: bigint, b: bigint) => {
  let aAbs = biAbs(a)
  let bAbs = biAbs(b)

  if (aAbs === 0n) {
    return bAbs
  } else if (bAbs === 0n) {
    return aAbs
  }

  let shift = 0n
  while (((aAbs | bAbs) & 1n) === 0n) {
    aAbs >>= 1n
    bAbs >>= 1n
    shift++
  }
  while ((aAbs & 1n) === 0n) aAbs >>= 1n
  do {
    while ((bAbs & 1n) === 0n) bAbs >>= 1n
    if (aAbs > bAbs) {
      const x = aAbs
      aAbs = bAbs
      bAbs = x
    }
    bAbs -= aAbs
  } while (bAbs !== 0n)

  // rescale
  return aAbs << shift
}

export const biMin = (a: bigint, b: bigint) => {
  return (a >= b) ? b : a
}

export const biMax = (a: bigint, b: bigint) => {
  return (a >= b) ? a : b
}

export const biAbs = (a: bigint) => {
  return (a >= 0) ? a : -a
}

const bitLength = (a: bigint) => {
  let bits = 1
  do {
    bits++
  } while ((a >>= 1n) > 1n)
  return bits
}

const fromBuffer = (buf: Uint8Array | Buffer) => {
  let ret = 0n
  for (const i of buf.values()) {
    const b = bi(i)
    ret = (ret << 8n) + b
  }
  return ret
}

const randomBytes = (byteLength: number, forceLength = false) => {
  const buf = new Uint8Array(byteLength)
  self.crypto.getRandomValues(buf)
  if (forceLength) buf[0] = buf[0] | 128
  return buf
}

const randomBits = (bitLength: number, forceLength = false) => {
  const byteLength = Math.ceil(bitLength / 8)
  const rndBytes = randomBytes(byteLength, false)
  const bitLengthMod8 = bitLength % 8
  if (bitLengthMod8 !== 0) {
    // Fill with 0's the extra bits
    rndBytes[0] = rndBytes[0] & (2 ** bitLengthMod8 - 1)
  }
  if (forceLength) {
    const mask = (bitLengthMod8 !== 0) ? 2 ** (bitLengthMod8 - 1) : 128
    rndBytes[0] = rndBytes[0] | mask
  }
  return rndBytes
}
