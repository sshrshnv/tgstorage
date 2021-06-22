export const roundSize = (size: number) =>
  Math.ceil(size * 10) / 10

export const formatSize = (size: number | undefined) => {
  if (!size) return ''
  const KB = size / 1024
  const MB = KB / 1024
  const GB = MB / 1024
  return GB >=1 ? `${roundSize(GB)} GB` : MB >= 1 ? `${roundSize(MB)} MB` : `${roundSize(KB)} KB`
}
