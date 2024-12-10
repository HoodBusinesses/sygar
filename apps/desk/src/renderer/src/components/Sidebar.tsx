import { navItems } from '@renderer/data/sidebar-items';
import { useAppSelector } from '@renderer/store/hooks';
import { Link, useLocation } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { cn } from './ui/lib/utils';

export default function Sidebar() {
  const location = useLocation();

  const { t } = useTranslation();

  const { isAccountActivated, userRole, userProfile } = useAppSelector(
    (state) => ({
      isAccountActivated: state.auth.auth.isAccountActivated,
      userRole: state.auth.auth.role,
      userProfile: state.auth.auth.userType,
    })
  );

  const active = location.pathname;

  return (
    <div className="h-screen w-64 bg-gray-50 border-r border-gray-200 p-4">
      {/* Navigation */}
      <nav className="mt-4">
        {/* Dashboard Section */}
        <div className="px-4 py-2 text-xs font-poppins text-gray-400 uppercase">
          {t('sidebar.sections.dashboard')}
        </div>
        <ul className="flex flex-col gap-2">
          {navItems(isAccountActivated, userRole, userProfile)
            .filter((item) => item.canVue)
            .map((item, index) => (
              <li key={index}>
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center px-4 py-2 gap-3 rounded-md text-sm font-poppins font-normal leading-[12px] tracking-[0.5px] transition-colors duration-200',
                    active.includes(item.href)
                      ? 'bg-blue-100/50 text-blue-600'
                      : 'text-[#273240] hover:bg-blue-50 hover:text-blue-500'
                  )}
                >
                  {item.icon && (
                    <item.icon
                      className={cn(
                        'h-5 w-5',
                        active.includes(item.href)
                          ? 'bg-blue-100/50 text-[#2563E9]'
                          : 'text-[#1E3A8A59] hover:bg-blue-50 hover:text-blue-500'
                      )}
                    />
                  )}
                  <span>{t(item.label)}</span>
                </Link>
              </li>
            ))}
        </ul>

        {/* Others Section */}
        <div className="px-4 py-2 mt-6 text-xs font-semibold text-gray-400 uppercase">
          {t('sidebar.sections.others')}
        </div>
      </nav>
    </div>
  );
}
