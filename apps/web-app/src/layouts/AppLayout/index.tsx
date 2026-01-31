import { AppShell } from '@justdx/components/organisms/AppShell'
import { LoadingLayout } from '@layouts/LoadingLayout'
import { useAuth } from '@shared/auth'
import { Navigate, useLocation, useNavigate } from '@tanstack/react-router'
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

  if (!isAuthenticated) return <Navigate to="/auth/login" />

  return (
    <AppShell defaultSidebarOpen sidebar={<Sidebar />} header={<Header />}>
      {children}
    </AppShell>
  )
}
