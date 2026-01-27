import { zodResolver } from '@hookform/resolvers/zod'
import type { SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'

import { loginSchema } from '@justdx/common'
import type { LoginFormData } from '@justdx/common'

export function useLoginForm() {
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit: SubmitHandler<LoginFormData> = (data) => {
    console.info('login.submit', data)
  }

  return {
    form,
    onSubmit,
    isSubmitting: form.formState.isSubmitting,
  }
}
