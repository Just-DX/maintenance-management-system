import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from '@justdx/components/atoms/Sonner'
import { useNavigate } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'

import { type SignupFormData, signupSchema } from '../config/schema'

export const useSignupForm = () => {
  const navigate = useNavigate()

  const form = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: '',
      fullName: '',
      password: '',
    },
  })

  // Simulated signup for now
  const onSubmit = async (data: SignupFormData) => {
    try {
      console.log('Signup data:', data)
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast.success('Account created successfully!')
      navigate({ to: '/' })
    } catch {
      toast.error('Failed to create account. Please try again.')
    }
  }

  return {
    form,
    onSubmit,
    isSubmitting: form.formState.isSubmitting,
  }
}
