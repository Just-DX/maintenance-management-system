import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from '@justdx/components/atoms/Sonner'
import { useAuth } from '@shared/auth'
import { useNavigate } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { apiClientPost } from '@shared/api'

import { type SignupFormData, signupSchema } from '../config/schema'

export const useSignupForm = () => {
  const navigate = useNavigate()
  const { signInWithPassword } = useAuth()

  const form = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: '',
      fullName: '',
      password: '',
    },
  })

  const onSubmit = form.handleSubmit(async (data: SignupFormData) => {
    const toastId = toast.loading('Creating your account...')
    try {
      await apiClientPost('/auth/signup', data)

      // Auto-login after successful signup
      await signInWithPassword({ email: data.email, password: data.password })

      toast.success('Account created. Welcome!', { id: toastId })
      navigate({ to: '/dashboard', replace: true })
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create account'
      toast.error(message, { id: toastId })
    }
  })

  return {
    form,
    onSubmit,
    isSubmitting: form.formState.isSubmitting,
  }
}
