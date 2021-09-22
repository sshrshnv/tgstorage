import { CIS } from '~/tools/detect-locale'

const getAnnouncementsChannelLocale = (country) =>
  CIS.includes(country.toLowerCase()) ? 'ru' : 'en'

export const getAnnouncementsChannelInvite = (country) =>
  getAnnouncementsChannelLocale(country) === 'ru' ? process.env.INVITE_RU : process.env.INVITE_EN
