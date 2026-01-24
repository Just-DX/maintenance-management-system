import { ResetPasswordPage } from '@pages/ResetPassword'
import { createRoute } from '@tanstack/react-router'

import { publicRoute } from './layout'

export const resetPasswordRoute = createRoute({
  getParentRoute: () => publicRoute,
  path: '/reset-password',
  component: ResetPasswordPage,
})
