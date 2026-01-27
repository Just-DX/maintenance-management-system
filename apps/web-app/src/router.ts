import { dashboardRoute } from '@routes/app/dashboard'
import { appRoute } from '@routes/app/layout'
import { workOrderDetailRoute } from '@routes/app/work-order-detail'
import { workOrderRoute } from '@routes/app/work-orders'
import { indexRoute } from '@routes/public'
import { forgotPasswordRoute } from '@routes/public/forgot-password'
import { publicRoute } from '@routes/public/layout'
import { resetPasswordRoute } from '@routes/public/reset-password'
import { signupRoute } from '@routes/public/signup'
import { createRouter } from '@tanstack/react-router'
import { rootRoute } from './routes/root'

const routeTree = rootRoute.addChildren([
  publicRoute.addChildren([indexRoute, signupRoute, forgotPasswordRoute, resetPasswordRoute]),
  appRoute.addChildren([dashboardRoute, workOrderRoute, workOrderDetailRoute]),
])

export const router = createRouter({
  routeTree,
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
