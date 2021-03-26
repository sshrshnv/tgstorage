import { h } from 'preact'
import type { FunctionComponent as FC } from 'preact'
import { useCallback, useState } from 'preact/hooks'
import type { StateUpdater } from 'preact/hooks'

import { setUser } from '~/core/actions'
import { useTexts } from '~/core/hooks'
import { api } from '~/api'
import { Form } from '~/ui/elements/form'
import { Text } from '~/ui/elements/text'
import { Break } from '~/ui/elements/break'
import { Input } from '~/ui/elements/input'
import { Button } from '~/ui/elements/button'
import { EyeOpenedIcon, EyeClosedIcon } from '~/ui/icons'

import type { Step } from './auth'

type Props = {
  setStep: StateUpdater<Step>
}

export const AuthPasswordForm: FC<Props> = () => {
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

  const handleSubmit = useCallback(() => {
    if (loading) return
    setLoading(true)

    api.checkPassword(password).then(({ user }) => {
      setUser(user)
    }).catch(({ error_message }) => {
      setError(error_message)
      setLoading(false)
    })
  }, [password, loading, setError])

  return (
    <Form onSubmit={handleSubmit} center>
      <Text uppercase>{texts.passwordTitle}</Text>
      <Break size={20} px/>

      <Text center>
        {texts.passwordDescription}
      </Text>
      <Break size={32} px/>

      <Input
        type={passwordVisible ? 'text' : 'password'}
        label={texts.passwordLabel}
        value={password}
        error={error && (texts[error] || texts.error)}
        readonly={loading}
        icon={passwordVisible ? <EyeOpenedIcon/> : <EyeClosedIcon/>}
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
}
