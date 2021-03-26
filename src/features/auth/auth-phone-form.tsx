import { h } from 'preact'
import type { FunctionComponent as FC } from 'preact'
import { useCallback, useEffect, useState } from 'preact/hooks'
import type { StateUpdater } from 'preact/hooks'

import { useTexts } from '~/core/hooks'
import { api } from '~/api'
import type { Countries } from '~/api'
import { formatPhone } from '~/tools/format-phone'
import { Form } from '~/ui/elements/form'
import { Text } from '~/ui/elements/text'
import { Break } from '~/ui/elements/break'
import { Select } from '~/ui/elements/select'
import { Input } from '~/ui/elements/input'
import { Button } from '~/ui/elements/button'
import { Loader } from '~/ui/elements/loader'

import {
  findCountryByPhone,
  findCountryByCountryValue
} from './auth.helpers'
import type { Step } from './auth'

type Props = {
  phone: string
  timeout: number
  setPhone: StateUpdater<string>
  setPhoneCodeHash: StateUpdater<string>
  setTimeout: StateUpdater<number>
  setStep: StateUpdater<Step>
}

export type Country = {
  value: string
  foundValue: string
  code: string
  mask: string
  patterns?: string[]
}

const initialCountry: Country = ({
  value: '',
  foundValue: '',
  code: '',
  mask: ''
})

export const AuthPhoneForm: FC<Props> = ({
  phone,
  timeout,
  setPhone,
  setPhoneCodeHash,
  setTimeout,
  setStep
}) => {
  const { texts } = useTexts('auth')
  const [ready, setReady] = useState(false)
  const [countries, setCountries] = useState<Countries['countries']>([])
  const [country, setCountry] = useState<Country>(initialCountry)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string|false>(false)

  const handleCountryValueSelect = useCallback(value => {
    const country = findCountryByCountryValue(countries, value)
    setCountry(country || { ...initialCountry, value })
    if (country) {
      setPhone(formatPhone('', country).value)
    }
  }, [setCountry])

  const handlePhoneChange = useCallback(phone => {
    if (error) {
      setError(false)
    }

    const { value, valid } = formatPhone(phone, country, { input: true })
    if (valid) {
      setPhone(value)
      return value
    }

    const foundCountry = findCountryByPhone(countries, phone)
    if (!foundCountry) {
      setCountry({ ...initialCountry })
      setPhone(value)
      return value
    }

    const { value: validValue } = formatPhone(phone, foundCountry, { input: true })
    setCountry(foundCountry)
    setPhone(validValue)
    return validValue
  }, [country, error, setPhone])

  const handleSubmit = useCallback(() => {
    if (loading) return
    setLoading(true)

    api.sendCode(phone).then(({ phone_code_hash, timeout }) => {
      setPhoneCodeHash(phone_code_hash)
      setStep('code')
      setTimeout(timeout)
    }).catch(({ error_message }) => {
      setError(error_message)
      setLoading(false)
    })
  }, [phone, loading, setPhoneCodeHash, setStep, setTimeout, setError])

  useEffect(() => {
    Promise.all([
      api.getCountry().then(({ country: value }) => setCountry({ ...country, value })),
      api.getCountries().then(({ countries }) => setCountries(countries))
    ]).then(() => setReady(true))
  }, [])

  useEffect(() => {
    const foundCountry = findCountryByCountryValue(countries, country.value)
    const validPhone = foundCountry?.code !== country.code ? '' : phone
    setCountry(foundCountry || { ...initialCountry, value: country.value })
    setPhone(formatPhone(validPhone, foundCountry).value)
  }, [country.value, countries, setPhone, setCountry])

  if (!ready) {
    return <Loader text="connecting"/>
  }

  return (
    <Form onSubmit={handleSubmit} center>
      <Text uppercase>{texts.title}</Text>
      <Break size={20} px/>

      <Text center>
        {texts.phoneDescription}
      </Text>
      <Break size={32} px/>

      <Select
        label={texts.countryLabel}
        value={country.value || country.foundValue}
        options={countries.map(country => country.hidden ? null : ({
          text: country.default_name,
          subText: `+${country.country_codes[0].country_code}`,
          value: country.iso2
        }))}
        search
        onSelect={handleCountryValueSelect}
      />
      <Break size={28} px/>

      <Input
        type="tel"
        label={texts.phoneLabel}
        value={phone}
        error={error && (texts[error] || texts.error)}
        readonly={loading}
        onInput={handlePhoneChange}
      />
      <Break size={28} px/>

      <Button
        type="submit"
        loading={loading}
        disabled={!!timeout || !!error}
        uppercase
        brand
      >
        {timeout || texts.button}
      </Button>
    </Form>
  )
}
