/**
 * Error message is a specail class for handling error packets.
 */
type ErrorDetails = {
  code: number
  message: string
}

export default class ErrorMessage {
  /** Packet hex to error message */
  static Errors: Record<number, ErrorDetails> = {
    0xfffffe53: {
      code: 404,
      message: 'Invalid packet was sent',
    },
    0xfffffe6c: {
      code: -1,
      message: 'Invalid auth key',
    },
  }

  /** Details of received error */
  error: ErrorDetails

  constructor(err: number) {
    this.error = ErrorMessage.Errors[err]
  }
}
