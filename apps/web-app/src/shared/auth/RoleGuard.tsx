import { useAuth } from './useAuth'
import type { RoleCode } from './auth.types'
import type { ReactNode } from 'react'

type RoleGuardProps = {
  roles: RoleCode[]
  siteId?: string
  fallback?: ReactNode
  children: ReactNode
}

export function RoleGuard({ roles, siteId, fallback = null, children }: RoleGuardProps) {
  const { isAuthenticated, isLoading, hasRole } = useAuth()

  if (isLoading) return null
  if (!isAuthenticated) return fallback
  if (!hasRole(roles, siteId)) return fallback

  return <>{children}</>
}
