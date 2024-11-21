import {
  Cog6ToothIcon,
  BellIcon,
  ClipboardDocumentListIcon,
  HomeIcon,
  UsersIcon,
  IdentificationIcon,
} from '@heroicons/react/24/outline';
import { FaUsers } from "react-icons/fa";

export const navItems = [
  { name: 'home', label: 'sidebar.items.home', href: '/dashboard', icon: HomeIcon },
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
  {
    name: 'users',
    label: 'sidebar.items.users',
    href: '/users-listing',
    icon: FaUsers,
  },
  // Add more items as needed
];
