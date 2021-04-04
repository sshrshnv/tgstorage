import BigInt from 'big-integer'
import type { BigInteger } from 'big-integer'

/**
 * Prime factorization p-Pollard Algorithm.
 * o(n^1/4)
 */
export function pqPrimePollard(pq: BigInteger): BigInteger[] {
  const n = pq

  const F = (x: BigInteger): BigInteger => x.multiply(x).subtract(BigInt.one)

  let x = BigInt.randBetween(1, n)
  let y = BigInt.one
  let stage = 2
  let i = 0

  let gcd = BigInt.gcd(n, (x.subtract(y)).abs())

  while (gcd.equals(BigInt.one)) {
    if (i === stage) {
      y = x
      stage *= 2
    }

    x = F(x).mod(n)

    gcd = BigInt.gcd(n, (x.subtract(y)).abs())

    i += 1
  }

  const q = n.divide(gcd)

  return gcd.greater(q) ? [q, gcd] : [gcd, q]
}

/**
 * Prime factorization Richard Brent's Algorithm
 */
export function BrentPrime(pq: BigInteger): BigInteger[] {
  const n = pq

  let y = BigInt.randBetween(BigInt.one, n)
  const c = BigInt.randBetween(BigInt.one, n)
  const m = BigInt.randBetween(BigInt.one, n)

  let g = BigInt(1); let r = BigInt(1); let q = BigInt(1); let x = BigInt(0); let ys = BigInt(0)

  while (g.equals(BigInt.one)) {
    x = y

    for (let i = 1; r.greaterOrEquals(BigInt(i)); i += 1) {
      y = y.multiply(y).mod(n).add(c).mod(n)
    }

    let k = BigInt(0)

    while (k.lesser(r) && g.equals(BigInt(1))) {
      ys = y

      for (let i = 1; BigInt.min(m, r.subtract(k)).greaterOrEquals(BigInt(i)); i += 1) {
        y = y.multiply(y).mod(n).add(c).mod(n)
        q = q.multiply(x.subtract(y).abs()).mod(n)
      }

      g = BigInt.gcd(q, n)
      k = k.add(m)
    }

    r = r.multiply(BigInt(2))
  }

  if (g.equals(n)) {
    // eslint-disable-next-line
    while (true) {
      ys = ys.multiply(ys).mod(n).add(c).mod(n)
      g = BigInt.gcd(x.subtract(ys).abs(), n)

      if (g.greater(BigInt.one)) break
    }
  }

  const pout = n.divide(g)

  return g.greater(pout) ? [pout, g] : [g, pout]
}
