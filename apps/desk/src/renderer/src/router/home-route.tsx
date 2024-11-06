import { createRoute } from '@tanstack/react-router'
import Home from '@renderer/containers/home'
import { rootRoute } from './root-route'

export const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home
})
