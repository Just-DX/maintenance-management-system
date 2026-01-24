import { AppLayout } from '@layouts/AppLayout'
import { createRoute, Outlet } from '@tanstack/react-router'
import { rootRoute } from '../root'

export const appRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'app',
  component: () => {
    // const { isAuthenticated, isLoading } = useAuth()
    // const navigate = useNavigate()
    // const location = useLocation()

    // useEffect(() => {
    //   if (!isLoading && !isAuthenticated) {
    //     const returnTo = encodeURIComponent(location.pathname + (location.search ?? ''))
    //     navigate({ to: '/', search: `?returnTo=${returnTo}` })
    //   }
    // }, [isLoading, isAuthenticated, navigate, location.pathname, location.search])

    // if (isLoading) return null

    return (
      <AppLayout>
        <Outlet />
      </AppLayout>
    )
  },
})
