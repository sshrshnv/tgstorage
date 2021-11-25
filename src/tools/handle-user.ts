import type { User } from '~/core/store'

export const checkIsLegacyUser = (user: User) =>
  typeof user?.id === 'number'
