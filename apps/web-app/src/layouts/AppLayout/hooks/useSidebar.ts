import { useSidebar as useSidebarComponent } from '@justdx/components'
import { useAuth } from '@shared/auth'
import { useLocation } from '@tanstack/react-router'

export function useSidebar() {
  const { user, signOut } = useAuth()
  const { isMobile } = useSidebarComponent()
  const location = useLocation()
  const pathname = location.pathname

  const handleSignOut = async () => {
    await signOut()
  }

  const checkIsActive = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname === href || pathname.startsWith(`${href}/`)
  }

  return {
    user,
    isMobile,
    role: user?.roles?.[0]?.code ?? 'technician',
    handleSignOut,
    checkIsActive,
  }
}
