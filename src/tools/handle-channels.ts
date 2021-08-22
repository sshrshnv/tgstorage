const CIS = ['ru', 'ua', 'by', 'ge', 'az', 'kz', 'uz', 'tj', 'kg']

const getAnnouncementsChannelLocale = (country) =>
  CIS.includes(country.toLowerCase()) ? 'ru' : 'en'

export const getAnnouncementsChannelInvite = (country) =>
  getAnnouncementsChannelLocale(country) === 'ru' ? process.env.INVITE_RU : process.env.INVITE_EN
