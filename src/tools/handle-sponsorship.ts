import { checkIsCIS } from '~/tools/detect-country'

export const getSponsorshipInvite = () =>
  process.env.SPONSORSHIP_CHANNEL_INVITE

export const getSponsorshipBotLink = (country = '') =>
  checkIsCIS(country) ? process.env.SPONSORSHIP_BOT_LINK_1 : process.env.SPONSORSHIP_BOT_LINK_0
