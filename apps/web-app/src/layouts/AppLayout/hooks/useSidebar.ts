import { useSidebar as useSidebarComponent } from '@justdx/components'
import { useMockUser } from '@shared/hooks/useMockUser'
import { useLocation } from '@tanstack/react-router'

export function useSidebar() {
  const { user, appLogo: AppLogo } = useMockUser()
  const { isMobile } = useSidebarComponent()
  const location = useLocation()
  const pathname = location.pathname

  const handleSignOut = () => {
    // TODO: Implement sign out
    console.log('Sign out')
  }

  const checkIsActive = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname === href || pathname.startsWith(`${href}/`)
  }

  return {
    user,
    AppLogo,
    isMobile,
    role: user?.role,
    handleSignOut,
    checkIsActive,
  }
}
