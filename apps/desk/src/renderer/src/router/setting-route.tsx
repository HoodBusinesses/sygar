import { createRoute } from '@tanstack/react-router'
import { rootRoute } from './root-route'
import settingPage from '@renderer/containers/setting'

export const settingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/settings',
  component: settingPage
})
