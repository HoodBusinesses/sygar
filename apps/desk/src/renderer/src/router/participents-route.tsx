import ParticipantsListing from '@renderer/containers/participants-listing'
import { createRoute } from '@tanstack/react-router'
import { rootRoute } from './root-route'

export const participantsListingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/participants-listing',
  component: ParticipantsListing
})
