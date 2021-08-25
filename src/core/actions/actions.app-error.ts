import type { BrowserClient } from '@sentry/browser'

import type { ApiError } from '~/api'
import { store } from '~/core/store'
import { logOut } from '~/core/actions'

const HANDLED_ERRORS = [
  'PHONE_NUMBER_BANNED',
  'PHONE_NUMBER_INVALID',
  'PHONE_NUMBER_FLOOD',
  'PHONE_CODE_EMPTY',
  'PHONE_CODE_EXPIRED',
  'PHONE_CODE_INVALID',
  'PHONE_NUMBER_UNOCCUPIED',
  'SESSION_PASSWORD_NEEDED',
  'PASSWORD_HASH_INVALID',
  'MESSAGE_NOT_MODIFIED',
  'FILE_REFERENCE_EXPIRED'
]

export const setAppErrorExists = (value: boolean) => {
  store.setState({
    appErrorExists: value
  })
}

export const handleApiError = (error: ApiError) => {
  const { code, message = '' } = error

  if (code === 303) return

  if (code === 401) {
    logOut()
    return
  }

  if (code !== 400 || !HANDLED_ERRORS.includes(message)) {
    sendAppError(error)
  }
}

export const sendAppError = async (error: ApiError|Error) => {
  try {
    setAppErrorExists(true)
  } catch (err) {}
  console.error(error)

  if (process.env.NODE_ENV !== 'production') return

  try {
    const Sentry = await loadSentry() as BrowserClient
    Sentry.captureException(error)
  } catch (err) {}
}

export const listenAppError = () => {
  self.addEventListener('error', ({ error }) => sendAppError(error))
  self.addEventListener('unhandledrejection', ({ reason }) => sendAppError(reason))
}

let Sentry
const loadSentry = async () => {
  if (Sentry) {
    return Sentry
  }

  Sentry = await import('@sentry/browser')
  Sentry.init({ dsn: process.env.SENTRY_DSN })

  return Sentry
}
