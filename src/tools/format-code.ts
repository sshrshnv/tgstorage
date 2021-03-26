export const formatCode = (code: string): string =>
  code.replace(/[^\d]/g, '')
