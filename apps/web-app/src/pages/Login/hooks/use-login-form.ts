import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema, type LoginFormData } from '@justdx/common'
import { toast } from '@justdx/components/atoms/Sonner'
import { useAuth } from '@shared/auth'
import { useNavigate } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'

export function useLoginForm() {
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const { signInWithPassword, signInWithGoogle, signInWithGithub } = useAuth()
  const navigate = useNavigate()
  const returnTo =
    typeof window !== 'undefined'
      ? new URLSearchParams(window.location.search).get('returnTo')
      : null

  const onSubmit = async (data: LoginFormData) => {
    const toastId = toast.loading('Signing you in...')
    try {
      await signInWithPassword(data)
      toast.success('Welcome back!', { id: toastId })

      const destination = returnTo && returnTo.startsWith('/') ? returnTo : '/dashboard'
      navigate({ to: destination, replace: true })
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to sign in'
      toast.error(message, { id: toastId })
    }
  }

  return {
    form,
    onSubmit,
    isSubmitting: form.formState.isSubmitting,
    signInWithGoogle,
    signInWithGithub,
  }
}
