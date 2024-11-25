import {
  Cog6ToothIcon,
  BellIcon,
  ClipboardDocumentListIcon,
  HomeIcon,
  UsersIcon,
  IdentificationIcon,
} from '@heroicons/react/24/outline';
import { hasPermission } from '@renderer/permissions/HasPermission';
import { Role, UserType } from '@renderer/store/slices/auth.slice';
import { FaUsers } from 'react-icons/fa';

export const navItems = (
  isAccountActivated: boolean,
  userRole: Role,
  userProfile: UserType
) => [
  {
    name: 'home',
    label: 'sidebar.items.home',
    href: '/dashboard',
    icon: HomeIcon,
    canVue: true,
  },
  {
    name: 'registration',
    label: 'sidebar.items.registration',
    href: '/registration',
    icon: IdentificationIcon,
    canVue: hasPermission(
      isAccountActivated,
      userRole,
      userProfile
    ).canAccessRegistration().canRead,
  },
  {
    name: 'organizations',
    label: 'sidebar.items.organizations',
    href: '/organizations',
    icon: UsersIcon,
    canVue: hasPermission(
      isAccountActivated,
      userRole,
      userProfile
    ).AccessOrganizations().canRead,
  },
  {
    name: 'settings',
    label: 'sidebar.items.settings',
    href: '/settings',
    icon: Cog6ToothIcon,
    canVue: hasPermission(
      isAccountActivated,
      userRole,
      userProfile
    ).canAccessSettings(),
  },
  {
    name: 'themes',
    label: 'sidebar.items.theme',
    href: '/themes-listing',
    icon: BellIcon,
    canVue: hasPermission(
      isAccountActivated,
      userRole,
      userProfile
    ).AccessThemes().canRead,
  },
  {
    name: 'users',
    label: 'sidebar.items.users',
    href: '/users-listing',
    icon: FaUsers,
    canVue: hasPermission(
      isAccountActivated,
      userRole,
      userProfile
    ).canAccessUsers().canRead,
  },
  // Add more items as needed
];
