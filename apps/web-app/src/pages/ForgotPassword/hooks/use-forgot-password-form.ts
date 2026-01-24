import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from '@justdx/components/atoms/Sonner'
import { useNavigate } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'

import { type ForgotPasswordFormData, forgotPasswordSchema } from '../config/schema'

export const useForgotPasswordForm = () => {
  const navigate = useNavigate()

  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  })

  // Simulated forgot password for now
  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      console.log('Forgot password data:', data)
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast.success('Reset link sent to your email!')
      navigate({ to: '/' })
    } catch (error) {
      toast.error('Failed to send reset link. Please try again.')
    }
  }

  return {
    form,
    onSubmit,
    isSubmitting: form.formState.isSubmitting,
  }
}
