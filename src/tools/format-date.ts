export const formatDate = (date: number, country = 'en') =>
  new Intl.DateTimeFormat([country, 'en']).format(date * 1000)
