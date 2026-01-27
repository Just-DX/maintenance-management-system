import { z } from 'zod'
import { VALIDATION_MESSAGES } from './messages'
import { REGEX } from './regex'

export const usernameSchema = z
  .string()
  .trim()
  .min(3, { message: VALIDATION_MESSAGES.username.length(3, 30) })
  .max(30, { message: VALIDATION_MESSAGES.username.length(3, 30) })
  .regex(REGEX.USERNAME, { message: VALIDATION_MESSAGES.username.invalid })

export type Username = z.infer<typeof usernameSchema>
