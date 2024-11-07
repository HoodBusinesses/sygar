import { createRouter } from '@tanstack/react-router'
import { homeRoute } from './home-route'
import { registrationRoute } from './registration-route'
import { signinRoute } from './signin-route'
import { rootRoute } from './root-route'
import { organizationsRoute } from './organizations-route'
import { themesListingRoute } from './themes-route'
import { participantsListingRoute } from './participents-route'
import { settingsRoute } from './setting-route'
import { editRoute } from './edit-route'

//TODO: ADD organization, themes, participants routes

const routeTree = rootRoute.addChildren([
  homeRoute,
  registrationRoute,
  signinRoute,
  organizationsRoute,
  themesListingRoute,
  participantsListingRoute,
  editRoute,
  settingsRoute
])

export const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
