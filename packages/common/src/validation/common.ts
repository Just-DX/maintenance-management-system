import { z } from 'zod'
import { VALIDATION_MESSAGES } from './messages'

export const requiredString = (message: string = VALIDATION_MESSAGES.required) =>
  z.string().trim().min(1, { message })

export const optionalTrimmedString = z
  .string()
  .trim()
  .transform((val) => (val === '' ? undefined : val))
  .optional()
