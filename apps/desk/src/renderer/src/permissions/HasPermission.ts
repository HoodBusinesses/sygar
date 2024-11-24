export type UserRoleType = 'admin' | 'user' | 'owner';

export type UserProfileType = 'SYGAR' | 'ORGANIZATION';

export const hasPermission = (
  isAccountActivated: boolean,
  userRole: UserRoleType,
  userProfile: UserProfileType
) => {
  return {
    // only SYGAR admin and owner can access registration
    canAccessRegistration: () => ({
      canRead:
        isAccountActivated && userProfile === 'SYGAR' && userRole !== 'user',
      canCUD:
        isAccountActivated && userProfile === 'SYGAR' && userRole !== 'user',
    }),

    // only SYGAR admin and owner can access organizations list
    AccessOrganizations: () => {
      return {
        canRead: isAccountActivated || userProfile === 'SYGAR',
        canCUD: userProfile === 'SYGAR',
      };
    },

    // only  Activated  Account
    canAccessSettings: () => isAccountActivated,

    // only  Activated  Account can read .  only ORGANIZATION adimn and owner can CUD
    AccessThemes: () => {
      return {
        canRead: isAccountActivated,
        canCUD:
          isAccountActivated &&
          userProfile === 'ORGANIZATION' &&
          (userRole !== 'user'),
      };
    },

    // only  Activated  Account and (SYGAR admin and owner) and (ORGANIZATION owner admin)
    canAccessUsers: () => ({
      canRead:
        isAccountActivated && (userRole !== 'user'),
      canCRUD:
        isAccountActivated && (userRole !== 'user'),
    }),
  };
};
