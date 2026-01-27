import { z } from 'zod'
import { VALIDATION_MESSAGES } from './messages'

export const urlSchema = z.string().trim().url({ message: VALIDATION_MESSAGES.url.invalid })

export type Url = z.infer<typeof urlSchema>
