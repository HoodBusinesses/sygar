'use client';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from '@tanstack/react-router';
import { navItems } from '@renderer/data/sidebar-items';

export default function Sidebar() {
  const [active, setActive] = useState('home');
  const { t } = useTranslation();

  useEffect(() => {
    // Example: Handle any required logic on mount
  }, []);

  return (
    <div className="h-screen w-64 bg-gray-50 border-r border-gray-200 p-4">
      {/* Navigation */}
      <nav className="mt-4">
        {/* Dashboard Section */}
        <div className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase">
          {t('sidebar.sections.dashboard')}
        </div>
        <ul className="flex flex-col gap-2">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className={`flex items-center px-4 py-2 gap-3 rounded-md text-sm font-medium transition-colors duration-200 ${
                  active === item.name
                    ? 'bg-blue-100 text-blue-500'
                    : 'text-gray-600 hover:bg-blue-50 hover:text-blue-500'
                }`}
                onClick={() => setActive(item.name)}
              >
                {item.icon && <item.icon className="h-5 w-5 text-gray-400" />}
                <span>{t(item.label)}</span>
              </Link>
            </li>
          ))}
        </ul>

        {/* Others Section */}
        <div className="px-4 py-2 mt-6 text-xs font-semibold text-gray-400 uppercase">
          {t('sidebar.sections.others')}
        </div>
        <ul className="space-y-1">
          {/* Assuming navItems has "Others" section items as well */}
          {navItems
            .filter((item) => item.section === 'others')
            .map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`flex items-center px-4 py-2 space-x-3 rounded-md text-sm font-medium transition-colors duration-200 ${
                    active === item.name
                      ? 'bg-blue-100 text-blue-500'
                      : 'text-gray-600 hover:bg-blue-50 hover:text-blue-500'
                  }`}
                  onClick={() => setActive(item.name)}
                >
                  {item.icon && <item.icon className="h-5 w-5 text-gray-400" />}
                  <span>{t(item.label)}</span>
                </Link>
              </li>
            ))}
        </ul>
      </nav>
    </div>
  );
}
