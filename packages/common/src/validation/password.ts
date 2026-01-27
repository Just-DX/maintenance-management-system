import { z } from 'zod'
import { VALIDATION_MESSAGES } from './messages'
import { REGEX } from './regex'

export interface PasswordOptions {
  min?: number
  max?: number
  requireUpper?: boolean
  requireLower?: boolean
  requireNumber?: boolean
  requireSymbol?: boolean
}

export const createPasswordSchema = ({
  min = 8,
  max = 72,
  requireUpper = true,
  requireLower = true,
  requireNumber = true,
  requireSymbol = false,
}: PasswordOptions = {}) => {
  let schema = z
    .string()
    .min(min, { message: VALIDATION_MESSAGES.password.min(min) })
    .max(max, { message: VALIDATION_MESSAGES.password.max(max) })

  if (requireUpper) {
    schema = schema.regex(REGEX.UPPERCASE, {
      message: VALIDATION_MESSAGES.password.uppercase,
    })
  }

  if (requireLower) {
    schema = schema.regex(REGEX.LOWERCASE, {
      message: VALIDATION_MESSAGES.password.lowercase,
    })
  }

  if (requireNumber) {
    schema = schema.regex(REGEX.NUMBER, {
      message: VALIDATION_MESSAGES.password.number,
    })
  }

  if (requireSymbol) {
    schema = schema.regex(REGEX.SYMBOL, {
      message: VALIDATION_MESSAGES.password.symbol,
    })
  }

  return schema
}

export const passwordSchema = createPasswordSchema()
export type Password = z.infer<typeof passwordSchema>
