import { AuthCallbackCard } from './components/AuthCallbackCard'
import { useAuthCallback } from './hooks/use-auth-callback'

export function AuthCallbackPage() {
  const { message } = useAuthCallback()

  return <AuthCallbackCard message={message} />
}
