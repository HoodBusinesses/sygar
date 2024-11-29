import { createRouter } from '@tanstack/react-router';
import { homeRoute } from './home-route';
import { registrationRoute } from './registration-route';
import { signinRoute } from './signin-route';
import { rootRoute } from './root-route';
import { organizationsRoute } from './organizations-route';
import { themesListingRoute } from './themes-route';
import { participantsListingRoute } from './participants-route';
import { groupListingRoute } from './group-route';
import { dashboardRoute } from './dashboard-route';
import { usersRoute } from './users-route';
import { profileRoute } from './profile-route';
import { settingsRoute } from './settings-route';

//TODO: ADD organization, themes, participants routes

const routeTree = rootRoute.addChildren([
  homeRoute,
  registrationRoute,
  dashboardRoute,
  signinRoute,
  organizationsRoute,
  themesListingRoute,
  participantsListingRoute,
  settingsRoute,
  profileRoute,
  groupListingRoute,
  usersRoute,
]);

export const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
