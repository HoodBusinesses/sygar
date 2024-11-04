'use client'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from '@tanstack/react-router'
import { navItems } from '@renderer/data/sidebar-items'
// import { usePersistentStore } from '../contexts/PersistentStoreContext';

export default function Sidebar() {
  const [active, setActive] = useState('home')
  const { t } = useTranslation()

  useEffect(() => {
    // Example: Handle any required logic on mount
  }, [])

  return (
    <div className="fixed top-20 left-0 h-screen w-64 bg-gray-50 border-r border-gray-200 p-4 overflow-y-auto z-0">
      {/* Navigation */}
      <nav className="mt-6">
        {/* Dashboard Section */}
        <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase">
          {t('sidebar.sections.dashboard')}
        </div>
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className={`flex items-center px-4 py-2 space-x-3 text-sm font-medium ${
                  active === item.name ? 'bg-blue-100 text-blue-500' : 'text-gray-600'
                } hover:bg-blue-100 hover:text-blue-500`}
                onClick={() => setActive(item.name)}
              >
                {item.icon && <item.icon className="h-5 w-5" />}
                {t(item.label)}
              </Link>
            </li>
          ))}
        </ul>

        {/* Others Section */}
        <div className="px-4 py-2 mt-8 text-xs font-semibold text-gray-500 uppercase">
          {t('sidebar.sections.others')}
        </div>
        <ul className="space-y-2"></ul>
      </nav>
    </div>
  )
}
