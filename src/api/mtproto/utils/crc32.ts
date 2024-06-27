const premadeTable = (() => {
  const table: number[] = []

  let c
  for (let n = 0; n < 256; n += 1) {
    c = n

    for (let k = 0; k < 8; k += 1) {
      c = ((c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1))
    }

    table[n] = c
  }
  return table
})()

export default function crc32(input: string): number {
  let output = 0 ^ (-1)

  for (let i = 0; i < input.length; i += 1) {
    output = (output >>> 8) ^ premadeTable[(output ^ input.charCodeAt(i)) & 0xFF]
  }

  return (output ^ (-1)) >>> 0
}
