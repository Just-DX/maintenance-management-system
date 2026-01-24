import { z } from 'zod'

export const signupSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  fullName: z.string().min(2, 'Full Name must be at least 2 characters'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

export type SignupFormData = z.infer<typeof signupSchema>
