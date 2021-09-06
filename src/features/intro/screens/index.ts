const importAll = r => {
  return r.keys().reduce((obj, key) => ({ ...obj, [key.replace('./', '')]: r(key) }), {})
}

export const screens = importAll(require.context('./', true, /\.(avif|webp|png)$/))
