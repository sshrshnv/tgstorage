import { bi, biRandom, biGCD, biAbs, biMin } from '../utils/bigint'

/**
 * Prime factorization p-Pollard Algorithm.
 * o(n^1/4)
 */
export function pqPrimePollard(pq: bigint): bigint[] {
  const n = pq

  const F = (x: bigint): bigint => x * x - 1n

  let x = biRandom(1n, n)
  let y = 1n
  let stage = 2
  let i = 0

  let gcd = biGCD(n, biAbs(x - y))

  while (gcd === 1n) {
    if (i === stage) {
      y = x
      stage *= 2
    }

    x = F(x) % n

    gcd = biGCD(n, biAbs(x - y))

    i += 1
  }

  const q = n / gcd

  return gcd > q ? [q, gcd] : [gcd, q]
}

/**
 * Prime factorization Richard Brent's Algorithm
 */
export function BrentPrime(pq: bigint): bigint[] {
  const n = pq

  let y = biRandom(1n, n)
  const c = biRandom(1n, n)
  const m = biRandom(1n, n)

  let g = 1n; let r = 1n; let q = 1n; let x = 0n; let ys = 0n

  while (g === 1n) {
    x = y

    for (let i = 1; r >= bi(i); i += 1) {
      y = (((y * y) % n) + c) % n
    }

    let k = 0n

    while (k < r && g === 1n) {
      ys = y

      for (let i = 1; biMin(m, r - k) >= bi(i); i += 1) {
        y = (((y * y) % n) + c) % n
        q = (q * biAbs(x - y)) % n
      }

      g = biGCD(q, n)
      k = k + m
    }

    r = r * 2n
  }

  if (g === n) {
    // eslint-disable-next-line
    while (true) {
      ys = (((ys * ys) % n) + c) % n
      g = biGCD(biAbs(x - ys), n)

      if (g > 1n) break
    }
  }

  const pout = n / g

  return g > pout ? [pout, g] : [g, pout]
}
