import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from '@justdx/components/atoms/Sonner'
import { useAuth } from '@shared/auth'
import { useForm } from 'react-hook-form'

import { type SignupFormData, signupSchema } from '../config/schema'

export const useSignupForm = () => {
  const { signUp } = useAuth()

  const form = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: '',
      fullName: '',
      username: '',
      password: '',
    },
  })

  const onSubmit = async (data: SignupFormData) => {
    const toastId = toast.loading('Creating your account...')
    try {
      await signUp(data)

      toast.success('Account created. Please check your email for verification!', { id: toastId })
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create account'
      toast.error(message, { id: toastId })
    }
  }

  return {
    form,
    onSubmit,
    isSubmitting: form.formState.isSubmitting,
  }
}
