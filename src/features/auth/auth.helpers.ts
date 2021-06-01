import type { Countries } from '~/api'

import type { Country } from './auth'

export const findCountryByPhone = (countries: Countries['countries'], phone: string): Country | null => {
  phone = phone.replace('+', '')

  if (!phone) {
    return null
  }

  let foundCountry: Countries['countries'][0] | null = null

  const foundCountries = countries.filter(country => {
    const { country_codes } = country

    const countryCode = country_codes.find(({ country_code, patterns }) => (
      country_code &&
      phone.startsWith(country_code) &&
      !!patterns?.length
    ))

    if (!countryCode) {
      return false
    }

    const { country_code, prefixes } = countryCode

    if (!prefixes?.length) {
      return true
    }

    const prefixLength = Math.max(...prefixes.map(prefix => prefix.length))

    if (phone.length < country_code.length + prefixLength) {
      return true
    }

    if (prefixes.some(prefix => phone.startsWith(`${country_code}${prefix}`))) {
      foundCountry = country
      return true
    }

    return false
  })

  if (foundCountry) {
    return normalizeCountry(foundCountry)
  }

  if (foundCountries.length !== 1) {
    return null
  }

  return normalizeCountry(foundCountries[0])
}

export const findCountryByCountryValue = (
  countries: Countries['countries'],
  value: string
): Country | null => {
  const country = countries.find(({ iso2 }) => iso2 === value) || null

  if (!country) {
    return null
  }

  return normalizeCountry(country)
}

const normalizeCountry = (
  country: Countries['countries'][0]
) => {
  const countryCode = country.country_codes.find(
    ({ country_code, patterns }) => !!country_code && !!patterns?.length
  )

  if (!countryCode) {
    return null
  }

  const code = countryCode.country_code
  const mask = countryCode.patterns?.sort((a, b) => a.length < b.length ? 1 : -1)[0] || ''

  return {
    value: country.iso2,
    foundValue: '',
    code,
    mask
  }
}
