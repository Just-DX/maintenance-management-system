import { emailSchema, passwordSchema, requiredString } from '@justdx/common/validation'
import { z } from 'zod'

export const signupSchema = z.object({
  email: emailSchema,
  fullName: requiredString('Full Name is required').min(2, 'Full Name must be at least 2 characters'),
  password: passwordSchema,
})

export type SignupFormData = z.infer<typeof signupSchema>
