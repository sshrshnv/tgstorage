import { proxy } from 'comlink'

import { store } from '~/core/store'
import { resetDataCache, resetFiles } from '~/core/cache'
import { logOut, getErrorSending } from '~/core/actions'
import type { ApiError } from '~/api'
import { api } from '~/api'
import { unregisterSW } from '~/sw'

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

const CONNECTION_ERRORS = [
  'CONNECTION_NOT_INITED'
]

export const setAppErrorExists = (value: boolean) => {
  store.setState({
    appErrorExists: value
  })
}

export const handleApiError = async (error: ApiError) => {
  const { code, message = '' } = error

  if (CONNECTION_ERRORS.includes(message)) {
    await Promise.all([
      resetDataCache(),
      resetFiles(),
      unregisterSW()
    ])
    self.location.reload()
    return
  }

  if (code === 303) return

  if (code === 401) {
    if (!HANDLED_ERRORS.includes(message)) {
      logOut()
    }
    return
  }

  if (code !== 400 || !HANDLED_ERRORS.includes(message)) {
    sendAppError(error, code < 500)
  }
}

export const sendAppError = async (
  error: ApiError|Error,
  errorExists = true
) => {
  if (errorExists) {
    try {
      setAppErrorExists(true)
    } catch (err) {}
  }

  console.error(error)

  if (
    process.env.NODE_ENV !== 'production' ||
    !process.env.SENTRY_DSN ||
    !getErrorSending()
  ) return

  try {
    const Sentry = await loadSentry()
    if ((error as ApiError).method && !!Sentry.withScope) {
      Sentry.withScope(scope => {
        scope.setFingerprint([JSON.stringify(error)])
        Sentry.captureException(error)
      })
    } else {
      Sentry.captureException(error)
    }
  } catch (err) {}
}

export const listenAppErrors = () => {
  self.addEventListener('error', ({ error }) => sendAppError(error))
  self.addEventListener('unhandledrejection', ({ reason }) => sendAppError(reason))
}

export const listenApiErrors = () => {
  api.listenErrors(proxy(handleApiError))
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
