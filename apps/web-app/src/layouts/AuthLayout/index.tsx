import { LeftPanel } from './components/LeftPanel'
import { useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'
import { useAuth } from '@shared/auth'
import { LoadingLayout } from '@layouts/LoadingLayout'

export function AuthLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigate({ to: '/dashboard', replace: true })
    }
  }, [isLoading, isAuthenticated, navigate])

  if (isLoading) return <LoadingLayout />

  return (
    <div className="min-h-screen flex bg-linear-to-br from-background via-background to-secondary/30">
      <LeftPanel />

      {/* Right Panel - Auth Forms */}
      <div className="flex-1 flex items-center justify-center p-8">{children}</div>
    </div>
  )
}
