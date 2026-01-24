import { appRoute } from '@routes/app/layout'
import { indexRoute } from '@routes/public'
import { forgotPasswordRoute } from '@routes/public/forgot-password'
import { publicRoute } from '@routes/public/layout'
import { resetPasswordRoute } from '@routes/public/reset-password'
import { signupRoute } from '@routes/public/signup'
import { createRouter } from '@tanstack/react-router'

import { rootRoute } from './routes/root'

const routeTree = rootRoute.addChildren([
  publicRoute.addChildren([indexRoute, signupRoute, forgotPasswordRoute, resetPasswordRoute]),
  appRoute.addChildren([]),
])

export const router = createRouter({
  routeTree,
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
