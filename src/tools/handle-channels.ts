import { CIS } from '~/tools/detect-locale'

const getAnncChannelLocale = (country) =>
  CIS.includes(country?.toLowerCase()) ? 'ru' : 'en'

export const getAnncChannelInvite = (country) =>
  getAnncChannelLocale(country) === 'ru' ? process.env.INVITE_RU : process.env.INVITE_EN

export const getAnncChannelInviteLink = (country) =>
  `https://t.me/+${getAnncChannelInvite(country)}`
