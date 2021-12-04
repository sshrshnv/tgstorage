import type { FunctionComponent as FC } from 'preact'
import type { StateUpdater } from 'preact/hooks'
import { h } from 'preact'
import { memo } from 'preact/compat'
import { useCallback, useState } from 'preact/hooks'

import { setUser } from '~/core/actions'
import { useTexts } from '~/core/hooks'
import { api } from '~/api'
import { Form } from '~/ui/elements/form'
import { Text } from '~/ui/elements/text'
import { Break } from '~/ui/elements/break'
import { Input } from '~/ui/elements/input'
import { Button } from '~/ui/elements/button'

import type { Step, Country } from './auth'

type Props = {
  country: Country
  setStep: StateUpdater<Step>
}

export const AuthFormPassword: FC<Props> = memo(({
  country
}) => {
  const { texts } = useTexts('auth')
  const [password, setPassword] = useState('')
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string|false>(false)

  const togglePasswordVisibility = useCallback(() => {
    setPasswordVisible(!passwordVisible)
  }, [passwordVisible])

  const handlePasswordChange = useCallback(password => {
    if (error) {
      setError(false)
    }

    setPassword(password)
    return password
  }, [error, setPassword])

  const handleSubmit = useCallback(async () => {
    if (loading) return
    setLoading(true)

    const response = await api.checkPassword(password, country.value || country.foundValue)
      .catch(({ message }) => {
        setError(message)
        setLoading(false)
      })

    if (response) {
      const { user } = response
      setUser(user);
      (self as any).gtag?.('event', 'login_end')
    }
  }, [country.value, country.foundValue, password, loading, setError])

  return (
    <Form onSubmit={handleSubmit} center>
      <Text uppercase bold>
        {texts.passwordTitle}
      </Text>
      <Break size={20} px/>

      <Text center>
        {texts.passwordDescription}
      </Text>
      <Break size={32} px/>

      <Input
        name={texts.passwordLabel}
        type={passwordVisible ? 'text' : 'password'}
        label={texts.passwordLabel}
        value={password}
        error={error && (texts[error] || texts.error)}
        readonly={loading}
        icon={passwordVisible ? 'eye-opened' : 'eye-closed'}
        autoFocus
        onIconClick={togglePasswordVisibility}
        onInput={handlePasswordChange}
      />
      <Break size={28} px/>

      <Button
        type="submit"
        loading={loading}
        disabled={!!error}
        uppercase
        brand
      >
        {texts.button}
      </Button>
    </Form>
  )
})
