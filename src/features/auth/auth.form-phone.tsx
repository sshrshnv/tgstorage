import type { FunctionComponent as FC } from 'preact'
import type { StateUpdater } from 'preact/hooks'
import { h, Fragment } from 'preact'
import { memo } from 'preact/compat'
import { useCallback, useEffect, useState } from 'preact/hooks'

import type { Countries } from '~/api'
import { api } from '~/api'
import { setAppFeatureRendered } from '~/core/actions'
import { useTexts, useSettings } from '~/core/hooks'
import { useUpdatableRef } from '~/tools/hooks'
import { formatPhone } from '~/tools/format-phone'
import { timer } from '~/tools/timer'
import { Form } from '~/ui/elements/form'
import { Text } from '~/ui/elements/text'
import { Break } from '~/ui/elements/break'
import { Select } from '~/ui/elements/select'
import { Input } from '~/ui/elements/input'
import { Button } from '~/ui/elements/button'
import { Link } from '~/ui/elements/link'

import {
  findCountryByPhone,
  findCountryByCountryValue
} from './auth.helpers'
import type { Step, Country } from './auth'

type Props = {
  phone: string
  timeout: number
  country: Country
  initialCountry: Country
  setCountry: StateUpdater<Country>
  setPhone: StateUpdater<string>
  setPhoneCodeHash: StateUpdater<string>
  setTimeout: StateUpdater<number>
  setCodeType: StateUpdater<{ type: string, nextType: string }>
  setStep: StateUpdater<Step>
}

export const AuthFormPhone: FC<Props> = memo(({
  phone,
  timeout,
  country,
  initialCountry,
  setCountry,
  setPhone,
  setPhoneCodeHash,
  setTimeout,
  setCodeType,
  setStep
}) => {
  const countryRef = useUpdatableRef(country)
  const initialCountryRef = useUpdatableRef(initialCountry)
  const phoneRef = useUpdatableRef(phone)
  const setCountryRef = useUpdatableRef(setCountry)
  const { langRef } = useSettings()
  const { texts } = useTexts('auth')
  const [ready, setReady] = useState(false)
  const [countries, setCountries] = useState<Countries['countries']>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string|false>(false)

  const handleCountryValueSelect = useCallback(value => {
    const country = findCountryByCountryValue(countries, value)
    setCountry(country || { ...initialCountry, value })
    if (country) {
      setPhone(formatPhone('', country).value)
    }
  }, [initialCountry, countries, setCountry, setPhone])

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
  }, [initialCountry, countries, country, error, setPhone, setCountry])

  const handleSubmit = useCallback(async () => {
    if (loading) return
    setLoading(true)

    const response = await api.sendCode(phone, country.value || country.foundValue)
      .catch(({ message }) => {
        setError(message)
        setLoading(false)
      })

    if (response) {
      const { phone_code_hash, timeout, type, next_type } = response
      setPhoneCodeHash(phone_code_hash)
      setStep('code')
      setTimeout(timeout)
      setCodeType({ type: type._, nextType: next_type?._ || '' })
    }
  }, [country.value, country.foundValue, phone, loading, setPhoneCodeHash, setCodeType, setStep, setTimeout, setError])

  useEffect(() => {
    const initialCountry = initialCountryRef.current
    const countryCode = countryRef.current.code
    const phone = phoneRef.current
    const foundCountry = findCountryByCountryValue(countries, country.value)
    const validPhone = foundCountry?.code !== countryCode ? '' : phone
    setCountryRef.current(foundCountry || { ...initialCountry, value: country.value })
    setPhone(formatPhone(validPhone, foundCountry).value)
  }, [country.value, countries])

  useEffect(() => {
    Promise.all([
      api.getCountry().then(({ country: value }) => setCountryRef.current({ ...countryRef.current, value })),
      api.getCountries(langRef.current).then(({ countries }) => setCountries(countries))
    ]).then(async () => {
      setReady(true)
      setAppFeatureRendered()
      await timer(1000);
      (self as any).gtag?.('event', 'login_start')
    })
  }, [])

  return (
    <Form onSubmit={handleSubmit} center>
      <Text uppercase bold>
        {texts.title}
      </Text>
      <Break size={20} px/>

      <Text center>
        {texts.phoneDescription}
      </Text>
      <Break size={32} px/>

      <Select
        name={texts.countryLabel}
        label={texts.countryLabel}
        value={country.value || country.foundValue}
        options={countries.map(country => country.hidden ? null : ({
          text: country.name || country.default_name,
          subText: `+${country.country_codes[0].country_code}`,
          value: country.iso2
        }))}
        loading={!ready}
        search
        onSelect={handleCountryValueSelect}
      />
      <Break size={28} px/>

      <Input
        name={texts.phoneLabel}
        type="tel"
        label={texts.phoneLabel}
        value={phone}
        error={error && (texts[error] || texts.error)}
        readonly={loading || !ready}
        disabled={!ready}
        onInput={handlePhoneChange}
      />
      <Break size={28} px/>

      {error === 'PHONE_NUMBER_BANNED' ? (
        <Fragment>
          <Link
            href={generateRecoverLink(phone)}
            outline
            uppercase
            alarm
          >
            {texts.buttonRecover}
          </Link>
          <Break size={28} px/>

          <Text small grey center>
            {texts.phoneBanDescription}
          </Text>
        </Fragment>
      ) : (
        <Button
          type="submit"
          loading={loading}
          disabled={!!timeout || !ready}
          uppercase
          brand
        >
          {timeout || texts.button}
        </Button>
      )}
    </Form>
  )
})

const generateRecoverLink = (phone: string) => {
  const email = 'recover@telegram.org'
  const subject = encodeURIComponent(`Banned phone number: ${phone}`)
  const body = encodeURIComponent(`I'm trying to use my mobile phone number:\n${phone}\nBut Telegram says it's banned. Please help.`)
  return `mailto:${email}?subject=${subject}&body=${body}`
}
