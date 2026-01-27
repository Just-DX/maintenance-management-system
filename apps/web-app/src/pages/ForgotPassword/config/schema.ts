import { emailSchema } from '@justdx/common'
import { z } from 'zod'

export const forgotPasswordSchema = z.object({
  email: emailSchema,
})

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>
