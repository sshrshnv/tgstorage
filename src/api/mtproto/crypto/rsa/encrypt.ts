import { bi, biFromTA, biToTA, biModPow } from '../../utils/bigint'
/**
 * Encrypts hex string with RSA
 * @param {string} data Data to encrypt, hex-string
 * @param {string} modulus RSA Key Modulus, hex-string
 * @param {string} exponent RSA Key Exponent, hex-string
 * @returns {string} Encrypted data, hex-string
 */
export default function encrypt(data: Uint8Array, modulus: Uint32Array, exponent: number): Uint32Array {
  const x = biFromTA(data)
  const n = biFromTA(modulus)
  const e = bi(exponent)

  return biToTA(biModPow(x, e, n), Uint32Array)
}
