import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from '@justdx/components/atoms/Sonner'
import { useNavigate } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'

import { type ResetPasswordFormData, resetPasswordSchema } from '../config/schema'

export const useResetPasswordForm = () => {
  const navigate = useNavigate()

  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  })

  // Simulated reset password for now
  const onSubmit = async (data: ResetPasswordFormData) => {
    try {
      console.log('Reset password data:', data)
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast.success('Password updated successfully!')
      navigate({ to: '/' })
    } catch (error) {
      toast.error('Failed to update password. Please try again.')
    }
  }

  return {
    form,
    onSubmit,
    isSubmitting: form.formState.isSubmitting,
  }
}
