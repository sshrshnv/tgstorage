export const TEXT_MODULE_NAMES = [
  'intro', 'auth', 'storage', 'widgets', 'elements', 'platform'
] as const

export type TextModules = typeof TEXT_MODULE_NAMES[number]
