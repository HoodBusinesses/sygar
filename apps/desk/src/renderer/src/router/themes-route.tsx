import ThemesListing from '@renderer/containers/themes-listing'
import { createRoute } from '@tanstack/react-router'
import { rootRoute } from './root-route'
import GroupThemes from '@renderer/components/GroupThemes'
import Participants from '@renderer/components/Participants'

const participantsRoute = createRoute({
  getParentRoute: () => themesListingRoute,
  path: '/participants',
  component: Participants
})

const groupThemesRoute = createRoute({
  getParentRoute: () => themesListingRoute,
  path: '/group-themes',
  component: GroupThemes
})

export const themesListingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/themes-listing',
  component: ThemesListing
  
})

themesListingRoute.addChildren([participantsRoute, groupThemesRoute])
