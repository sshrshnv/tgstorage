import { h } from 'preact'
import type { FunctionComponent as FC } from 'preact'
import { useState, useEffect } from 'preact/hooks'

import { Layout } from '~/ui/elements/layout'
import { Logo } from '~/ui/elements/logo'
import { Break } from '~/ui/elements/break'

import { AuthPhoneForm } from './auth-phone-form'
import { AuthCodeForm } from './auth-code-form'
import { AuthPasswordForm } from './auth-password-form'

export type Step = 'phone'|'code'|'password'

let timeoutId = 0

const Auth: FC = () => {
  const [step, setStep] = useState<Step>('phone')
  const [phone, setPhone] = useState('+')
  const [phoneCodeHash, setPhoneCodeHash] = useState('')
  const [timeout, setTimeout] = useState(0)

  useEffect(() => {
    if (timeout && !timeoutId) {
      setTimeout(timeout)
    }

    if (!timeout) {
      timeoutId = 0
      return
    }

    timeoutId = window.setTimeout(() => {
      setTimeout(timeout - 1)
    }, 1000)

    return () => {
      if (timeoutId) {
        window.clearTimeout(timeoutId)
        timeoutId = 0
      }
    }
  }, [timeout])

  return (
    <Layout center>
      <Break size={10} vh/>
      <Logo/>
      <Break size={10} vh/>

      { step === 'phone' && (
        <AuthPhoneForm
          phone={phone}
          timeout={timeout}
          setPhone={setPhone}
          setTimeout={setTimeout}
          setPhoneCodeHash={setPhoneCodeHash}
          setStep={setStep}
        />
      )}
      { step === 'code' && (
        <AuthCodeForm
          phone={phone}
          phoneCodeHash={phoneCodeHash}
          setStep={setStep}
        />
      )}
      { step === 'password' && (
        <AuthPasswordForm
          setStep={setStep}
        />
      )}

      <Break size={10} vh/>
    </Layout>
  )
}

export default Auth
