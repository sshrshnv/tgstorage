import BigInt from 'big-integer'

/**
 * Encrypts hex string with RSA
 * @param {string} data Data to encrypt, hex-string
 * @param {string} modulus RSA Key Modulus, hex-string
 * @param {string} exponent RSA Key Exponent, hex-string
 * @returns {string} Encrypted data, hex-string
 */
export default function encrypt(data: Uint8Array, modulus: Uint32Array, exponent: number): Uint32Array {
  const x = BigInt.fromArray(Array.from(data), 0x100)
  const n = BigInt.fromArray(Array.from(modulus), 0x100000000)
  const e = BigInt(exponent)

  return new Uint32Array(x.modPow(e, n).toArray(0x100000000).value)
}
