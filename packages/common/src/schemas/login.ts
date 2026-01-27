import z from 'zod'
import { createPasswordSchema, emailSchema } from '../validation'

const loginSchema = z.object({
  email: emailSchema,
  password: createPasswordSchema({ max: 128, requireSymbol: true }),
  rememberMe: z.boolean().optional(),
})

type LoginFormData = z.infer<typeof loginSchema>

export { loginSchema }
export type { LoginFormData }
