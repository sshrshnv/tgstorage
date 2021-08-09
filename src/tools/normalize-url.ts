export const normalizeUrl = (url: string) =>
  `https://${url.replaceAll(/https?:\/\/?/ig, '')}`
