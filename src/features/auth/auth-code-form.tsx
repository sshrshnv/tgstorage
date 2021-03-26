import { h } from 'preact'
import type { FunctionComponent as FC } from 'preact'
import { useCallback, useState } from 'preact/hooks'
import type { StateUpdater } from 'preact/hooks'

import { setUser } from '~/core/actions'
import { useTexts } from '~/core/hooks'
import { api } from '~/api'
import { formatCode } from '~/tools/format-code'
import { Form } from '~/ui/elements/form'
import { Text } from '~/ui/elements/text'
import { Break } from '~/ui/elements/break'
import { Input } from '~/ui/elements/input'
import { Button } from '~/ui/elements/button'
import { EditIcon } from '~/ui/icons'

import type { Step } from './auth'

type Props = {
  phone: string
  phoneCodeHash: string
  setStep: StateUpdater<Step>
}

export const AuthCodeForm: FC<Props> = ({
  phone,
  phoneCodeHash,
  setStep
}) => {
  const { texts } = useTexts('auth')
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string|false>(false)

  const handleCodeChange = useCallback(code => {
    if (error) {
      setError(false)
    }

    code = formatCode(code)
    setCode(code)
    return code
  }, [error, setCode])

  const handlePhoneChange = useCallback(() => {
    setStep('phone')
  }, [setStep])

  const handleSubmit = useCallback(() => {
    if (loading) return
    setLoading(true)

    api.signIn(phone, code, phoneCodeHash).then(({ user }) => {
      if (!user) {
        /*api.signUp(phone, phoneCodeHash, 'Tom').then(({ user }) => {
          setUser(user)
        })
        return*/
        setError('PHONE_NUMBER_UNOCCUPIED')
        setLoading(false)
        return
      }

      setUser(user)
    }).catch(({ error_message }) => {
      if (error_message === 'SESSION_PASSWORD_NEEDED') {
        setStep('password')
        return
      }
      setError(error_message)
      setLoading(false)
    })
  }, [phone, phoneCodeHash, code, loading, setStep, setError])

  return (
    <Form onSubmit={handleSubmit} center>
      <Text uppercase icon={<EditIcon onClick={handlePhoneChange}/>}>
        {phone}
      </Text>
      <Break size={20} px/>

      <Text center>
        {texts.codeDescription}
      </Text>
      <Break size={32} px/>

      <Input
        type="tel"
        label={texts.codeLabel}
        value={code}
        error={error && (texts[error] || texts.error)}
        readonly={loading}
        onInput={handleCodeChange}
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
