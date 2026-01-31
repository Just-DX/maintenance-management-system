import { AppShell } from '@justdx/components/organisms/AppShell'
import { Header } from './components/Header'
import { Sidebar } from './components/Sidebar'
import { useAuth } from '@shared/auth'
import { useLocation, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'
import { LoadingLayout } from '@layouts/LoadingLayout'

export function AppLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      if (location.pathname === '/') return
      const returnTo = encodeURIComponent(location.pathname + (location.searchStr ?? ''))
      navigate({ to: '/', search: { returnTo } })
    }
  }, [isLoading, isAuthenticated, navigate, location.pathname, location.searchStr])

  if (isLoading) return <LoadingLayout />

  return (
    <AppShell defaultSidebarOpen sidebar={<Sidebar />} header={<Header />}>
      {children}
    </AppShell>
  )
}
