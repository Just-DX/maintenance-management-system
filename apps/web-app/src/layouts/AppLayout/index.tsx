import { AppShell } from '@justdx/components/organisms/AppShell'
import { LoadingLayout } from '@layouts/LoadingLayout'
import { useAuth } from '@shared/auth'
import { useLocation, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'
import { Header } from './components/Header'
import { Sidebar } from './components/Sidebar'

export function AppLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (!isLoading && !isAuthenticated && !location.searchStr?.includes('returnTo=')) {
      const returnTo = encodeURIComponent(location.pathname + (location.searchStr ?? ''))
      navigate({ to: '/auth/login', search: { returnTo } })
    }
  }, [isLoading, isAuthenticated, navigate, location.pathname, location.searchStr])

  // Show loading while auth state is being determined
  if (isLoading) return <LoadingLayout />

  // Don't render children until we've confirmed authentication
  // This prevents API calls from being made before the auth token is available
  if (!isAuthenticated) return <LoadingLayout />

  return (
    <AppShell defaultSidebarOpen sidebar={<Sidebar />} header={<Header />}>
      {children}
    </AppShell>
  )
}
