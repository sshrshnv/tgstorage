import type { FunctionComponent as FC } from 'preact'
import { h } from 'preact'
import { memo } from 'preact/compat'
import { useState, useEffect, useRef } from 'preact/hooks'

import { listenApiErrors } from '~/core/actions'
import { LangMenu } from '~/features/shared'
import { Layout } from '~/ui/elements/layout'
import { LayoutBlock } from '~/ui/elements/layout-block'
import { Logo } from '~/ui/elements/logo'
import { Break } from '~/ui/elements/break'

import { AuthFormPhone } from './auth.form-phone'
import { AuthFormCode } from './auth.form-code'
import { AuthFormPassword } from './auth.form-password'

export type Step = 'phone'|'code'|'password'

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

let timeoutId = 0

const Auth: FC = memo(() => {
  const layoutRef = useRef<HTMLDivElement>(null)
  const [step, setStep] = useState<Step>('phone')
  const [country, setCountry] = useState<Country>(initialCountry)
  const [phone, setPhone] = useState('+')
  const [phoneCodeHash, setPhoneCodeHash] = useState('')
  const [codeType, setCodeType] = useState({ type: '', nextType: '' })
  const [timeout, setTimeout] = useState(0)

  useEffect(() => {
    if (timeout && !timeoutId) {
      setTimeout(timeout)
    }

    if (!timeout) {
      timeoutId = 0
      return
    }

    timeoutId = self.setTimeout(() => {
      setTimeout(timeout - 1)
    }, 1000)

    return () => {
      if (timeoutId) {
        self.clearTimeout(timeoutId)
        timeoutId = 0
      }
    }
  }, [timeout])

  useEffect(() => {
    listenApiErrors()
  }, [])

  return (
    <Layout
      forwardedRef={layoutRef}
      scroll
      center
      outer
    >
      <LayoutBlock header wide>
        <LangMenu
          layoutRef={layoutRef}
        />
      </LayoutBlock>
      <Break mSize={48} dSize={72} px/>

      <Logo/>
      <Break mSize={40} dSize={64} px/>

      { step === 'phone' && (
        <AuthFormPhone
          phone={phone}
          timeout={timeout}
          country={country}
          initialCountry={initialCountry}
          setCountry={setCountry}
          setPhone={setPhone}
          setTimeout={setTimeout}
          setPhoneCodeHash={setPhoneCodeHash}
          setCodeType={setCodeType}
          setStep={setStep}
        />
      )}
      { step === 'code' && (
        <AuthFormCode
          country={country}
          phone={phone}
          phoneCodeHash={phoneCodeHash}
          timeout={timeout}
          codeType={codeType}
          setTimeout={setTimeout}
          setPhoneCodeHash={setPhoneCodeHash}
          setCodeType={setCodeType}
          setStep={setStep}
        />
      )}
      { step === 'password' && (
        <AuthFormPassword
          country={country}
          setStep={setStep}
        />
      )}

      <Break mSize={48} dSize={72} px/>
    </Layout>
  )
})

export default Auth
