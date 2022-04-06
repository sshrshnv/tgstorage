export const formatPhone = (
  phone: string,
  country: {
    code: string
    mask: string
  } | null,
  options: {
    input?: boolean
  } = {}
): {
  value: string
  valid: boolean
} => {
  const { code = '', mask = '' } = country || {}

  if (!options?.input && (!phone || !code || !mask)) {
    return {
      value: `+${code ? `${code} ` : ''}`,
      valid: !!mask && !!code
    }
  }

  if (options?.input && (!code || !phone.startsWith(`+${code} `))) {
    phone = phone.replace(/[^\d]/g, '')
    return {
      value: `+${phone}`,
      valid: !!code && phone.startsWith(`${code}`)
    }
  }

  phone = phone.replace(/[^\d]/g, '')

  if (phone.startsWith(code)) {
    phone = phone.slice(code.length)
  }

  //phone = phone.slice(0, mask.replaceAll(' ', '').length)

  let maskSpacesCount = 0
  phone = phone.split('').map((item, index) => {
    const maskChar = mask?.[index + maskSpacesCount]?.replace('X', '')
    maskSpacesCount += +(maskChar === ' ')
    return `${maskChar}${item}`
  }).join('')

  return {
    value: `+${code} ${phone}`,
    valid: true
  }
}
