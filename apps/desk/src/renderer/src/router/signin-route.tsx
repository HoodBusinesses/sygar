import Signin from '@renderer/containers/sign-in'
import { createRoute } from '@tanstack/react-router'
import { rootRoute } from './root-route'

export const signinRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/signin',
  component: Signin
})
