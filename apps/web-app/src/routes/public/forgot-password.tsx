import { ForgotPasswordPage } from '@pages/ForgotPassword'
import { createRoute } from '@tanstack/react-router'

import { publicRoute } from './layout'

export const forgotPasswordRoute = createRoute({
  getParentRoute: () => publicRoute,
  path: '/auth/forgot-password',
  component: ForgotPasswordPage,
})
