import { AuthLayout } from '@layouts/AuthLayout'
import { createRoute, Outlet } from '@tanstack/react-router'
import { rootRoute } from '../root'

export const publicRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'public',
  component: () => {
    // const { isAuthenticated, isLoading } = useAuth()
    // const navigate = useNavigate()

    // useEffect(() => {
    //   if (!isLoading && isAuthenticated) {
    //     navigate({ to: '/dashboard' })
    //   }
    // }, [isLoading, isAuthenticated, navigate])

    // if (isLoading) return null

    return (
      <AuthLayout>
        <Outlet />
      </AuthLayout>
    )
  },
})
