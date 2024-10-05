import Link from 'next/link';
import { useState } from 'react';
import {
  Cog6ToothIcon,
  BellIcon,
  ClipboardDocumentListIcon,
  HomeIcon,
  UsersIcon,
  IdentificationIcon,
} from '@heroicons/react/24/outline';

export default function Sidebar() {
  const [active, setActive] = useState("home");

  return (
    <div className="h-screen w-64 bg-gray-50 border border-gray-200">
      {/* Navigation */}
      <nav className="mt-10">
        {/* Dashboard Section */}
        <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase">Dashboard</div>
        <ul className="space-y-2">
          <li>
            <Link href="/home" legacyBehavior>
              <a
                className={`flex items-center px-4 py-2 space-x-3 text-sm font-medium ${
                  active === "home" ? "bg-blue-100 text-blue-500" : "text-gray-600"
                } hover:bg-blue-100 hover:text-blue-500`}
                onClick={() => setActive("home")}
              >
                <HomeIcon className="h-5 w-5" />
                <span>Home</span>
              </a>
            </Link>
          </li>
          <li>
            <Link href="/registration" legacyBehavior>
              <a
                className={`flex items-center px-4 py-2 space-x-3 text-sm font-medium ${
                  active === "registration" ? "bg-blue-100 text-blue-500" : "text-gray-600"
                } hover:bg-blue-100 hover:text-blue-500`}
                onClick={() => setActive("registration")}
              >
                <IdentificationIcon className="h-5 w-5" />
                <span>Registration</span>
              </a>
            </Link>
          </li>
          <li>
            <Link href="/organizations" legacyBehavior>
              <a
                className={`flex items-center px-4 py-2 space-x-3 text-sm font-medium ${
                  active === "organizations" ? "bg-blue-100 text-blue-500" : "text-gray-600"
                } hover:bg-blue-100 hover:text-blue-500`}
                onClick={() => setActive("organizations")}
              >
                <UsersIcon className="h-5 w-5" />
                <span>Organizations</span>
              </a>
            </Link>
          </li>
          <li>
            <Link href="/settings" legacyBehavior>
              <a
                className={`flex items-center px-4 py-2 space-x-3 text-sm font-medium ${
                  active === "settings" ? "bg-blue-100 text-blue-500" : "text-gray-600"
                } hover:bg-blue-100 hover:text-blue-500`}
                onClick={() => setActive("settings")}
              >
                <Cog6ToothIcon className="h-5 w-5" />
                <span>Settings</span>
              </a>
            </Link>
          </li>
        </ul>

        {/* Othres Section */}
        <div className="px-4 py-2 mt-8 text-xs font-semibold text-gray-500 uppercase">Othres</div>
        <ul className="space-y-2">
          <li>
            <Link href="/notifications" legacyBehavior>
              <a
                className={`flex items-center px-4 py-2 space-x-3 text-sm font-medium ${
                  active === "notifications" ? "bg-blue-100 text-blue-500" : "text-gray-600"
                } hover:bg-blue-100 hover:text-blue-500`}
                onClick={() => setActive("notifications")}
              >
                <BellIcon className="h-5 w-5" />
                <span>Manage Notifications</span>
              </a>
            </Link>
          </li>
          <li>
            <Link href="/reports" legacyBehavior>
              <a
                className={`flex items-center px-4 py-2 space-x-3 text-sm font-medium ${
                  active === "reports" ? "bg-blue-100 text-blue-500" : "text-gray-600"
                } hover:bg-blue-100 hover:text-blue-500`}
                onClick={() => setActive("reports")}
              >
                <ClipboardDocumentListIcon className="h-5 w-5" />
                <span>Reports</span>
              </a>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
