import {
  Cog6ToothIcon,
  BellIcon,
  ClipboardDocumentListIcon,
  HomeIcon,
  UsersIcon,
  IdentificationIcon,
} from '@heroicons/react/24/outline';

export const navItems = [
  { name: 'home', label: 'sidebar.items.home', href: '/', icon: HomeIcon },
  {
    name: 'registration',
    label: 'sidebar.items.registration',
    href: '/registration',
    icon: IdentificationIcon,
  },
  {
    name: 'organizations',
    label: 'sidebar.items.organizations',
    href: '/organizations',
    icon: UsersIcon,
  },
  {
    name: 'settings',
    label: 'sidebar.items.settings',
    href: '/settings',
    icon: Cog6ToothIcon,
  },
  {
    name: 'themes',
    label: 'sidebar.items.theme',
    href: '/themes-listing',
    icon: BellIcon,
  },
  // {
  //   name: 'participants',
  //   label: 'sidebar.items.participants',
  //   href: '/participant-listing',
  //   icon: ClipboardDocumentListIcon,
  // },
  // Add more items as needed
];
