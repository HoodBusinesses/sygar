'use client'
import { useEffect, useState } from 'react';
import {
  Cog6ToothIcon,
  BellIcon,
  ClipboardDocumentListIcon,
  HomeIcon,
  UsersIcon,
  IdentificationIcon,
} from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';
// import { usePersistentStore } from '../contexts/PersistentStoreContext';

export default function Sidebar() {
  const [active, setActive] = useState("home");
  const { t } = useTranslation();

  // const { data } = usePersistentStore();
  const handleSave = () => {
    // const newData = { ...data, canView: true, canModify: true };
  };

  useEffect(() => {
    handleSave();
  }, []);
  return (
    <div className="h-auto w-64 bg-gray-50 border border-gray-200 p-4">
      {/* Navigation */}
      <nav className="mt-6">
        {/* Dashboard Section */}
        <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase">{t('sidebar.sections.dashboard')}</div>
        <ul className="space-y-2">
          <li>
            <a href="/" >
              <a
                className={`flex items-center px-4 py-2 space-x-3 text-sm font-medium ${active === "home" ? "bg-blue-100 text-blue-500" : "text-gray-600"
                  } hover:bg-blue-100 hover:text-blue-500`}
                onClick={() => setActive("home")}
              >
                <HomeIcon className="h-5 w-5" />
                <span>{t('sidebar.items.home')}</span>
              </a>
            </a>
          </li>
          <li>
            <a href="/registration">
              <a
                className={`flex items-center px-4 py-2 space-x-3 text-sm font-medium ${active === "registration" ? "bg-blue-100 text-blue-500" : "text-gray-600"
                  } hover:bg-blue-100 hover:text-blue-500`}
                onClick={() => setActive("registration")}
              >
                <IdentificationIcon className="h-5 w-5" />
                <span>{t('sidebar.items.registration')}</span>
              </a>
            </a>
          </li>
          <li>
            <a href="/organizations">
              <a
                className={`flex items-center px-4 py-2 space-x-3 text-sm font-medium ${active === "organizations" ? "bg-blue-100 text-blue-500" : "text-gray-600"
                  } hover:bg-blue-100 hover:text-blue-500`}
                onClick={() => setActive("organizations")}
              >
                <UsersIcon className="h-5 w-5" />
                <span>{t('sidebar.items.organizations')}</span>
              </a>
            </a>
          </li>
          <li>
            <a href="/settings">
              <a
                className={`flex items-center px-4 py-2 space-x-3 text-sm font-medium ${active === "settings" ? "bg-blue-100 text-blue-500" : "text-gray-600"
                  } hover:bg-blue-100 hover:text-blue-500`}
                onClick={() => setActive("settings")}
              >
                <Cog6ToothIcon className="h-5 w-5" />
                <span>{t('sidebar.items.settings')}</span>
              </a>
            </a>
          </li>
        </ul>

        {/* Othres Section */}
        <div className="px-4 py-2 mt-8 text-xs font-semibold text-gray-500 uppercase">{t('sidebar.sections.others')}</div>
        <ul className="space-y-2">
          <li>
            <a href="/notifications">
              <a
                className={`flex items-center px-4 py-2 space-x-3 text-sm font-medium ${active === "notifications" ? "bg-blue-100 text-blue-500" : "text-gray-600"
                  } hover:bg-blue-100 hover:text-blue-500`}
                onClick={() => setActive("notifications")}
              >
                <BellIcon className="h-5 w-5" />
                <span>{t('sidebar.items.notifications')}</span>
              </a>
            </a>
          </li>
          <li>
            <a href="/reports">
              <a
                className={`flex items-center px-4 py-2 space-x-3 text-sm font-medium ${active === "reports" ? "bg-blue-100 text-blue-500" : "text-gray-600"
                  } hover:bg-blue-100 hover:text-blue-500`}
                onClick={() => setActive("reports")}
              >
                <ClipboardDocumentListIcon className="h-5 w-5" />
                <span>{t('sidebar.items.reports')}</span>
              </a>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}