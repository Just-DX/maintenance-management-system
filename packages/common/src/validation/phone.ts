import { z } from 'zod'
import { VALIDATION_MESSAGES } from './messages'
import { REGEX } from './regex'

export interface PhoneOptions {
  allowLocal?: boolean
}

export const createPhoneSchema = ({ allowLocal = false }: PhoneOptions = {}) => {
  if (allowLocal) {
    // If local is allowed, we might accept shorter numbers or different formats
    // For now, let's keep it simple: min 10 digits
    return (
      z
        .string()
        .trim()
        .min(10, { message: VALIDATION_MESSAGES.phone.invalid })
        // Rough check for mostly potential phone chars
        .regex(/^[\d+\-\s()]{7,20}$/, { message: VALIDATION_MESSAGES.phone.invalid })
    )
  }

  return z.string().trim().regex(REGEX.PHONE_E164, { message: VALIDATION_MESSAGES.phone.invalid })
}

export const phoneSchema = createPhoneSchema()
export type Phone = z.infer<typeof phoneSchema>
