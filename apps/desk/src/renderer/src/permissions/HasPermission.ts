import { Role, UserType } from "@renderer/store/slices/auth.slice";

export const hasPermission = (
  isAccountActivated: boolean,
  userRole: Role,
  userProfile: UserType
) => {
  return {
    // only SOLUTION_OWNER admin and owner can access registration
    canAccessRegistration: () => ({
      canRead:
        isAccountActivated && userProfile === 'SOLUTION_OWNER',
      canCUD:
        isAccountActivated &&
        userProfile === 'SOLUTION_OWNER'
    }),

    // only SOLUTION_OWNER admin and owner can access organizations list
    AccessOrganizations: () => {
      return {
        canRead: isAccountActivated ,
        canCUD: isAccountActivated && userProfile === 'SOLUTION_OWNER',
      };
    },

    // only  Activated  Account
    canAccessSettings: () => isAccountActivated && userProfile === 'ORGANIZATION_USER',

    // only  Activated  Account can read .  only ORGANIZATION adimn and owner can CUD
    AccessThemes: () => {
      return {
        canRead: isAccountActivated && userProfile === 'ORGANIZATION_USER',
        canCUD: isAccountActivated && userProfile === 'ORGANIZATION_USER',
      };
    },

    // only  Activated  Account and (SOLUTION_OWNER admin and owner) and (ORGANIZATION owner admin)
    canAccessUsers: () => ({
      canRead: isAccountActivated,
      canCRUD: isAccountActivated,
    }),
  };
};
