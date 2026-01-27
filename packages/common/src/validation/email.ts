import { z } from 'zod'
import { VALIDATION_MESSAGES } from './messages'

export const emailSchema = z
  .string()
  .trim()
  .email({ message: VALIDATION_MESSAGES.email.invalid })
  .min(5)
  .max(255)

export type Email = z.infer<typeof emailSchema>
