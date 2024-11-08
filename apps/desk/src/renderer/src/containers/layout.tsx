import Navbar from '@renderer/components/Navbar';
import Sidebar from '@renderer/components/Sidebar';
import { cn } from '@renderer/components/ui/lib/utils';
import { useAuth } from '@renderer/hooks/useAuth';
import { useProtocol } from '@renderer/hooks/useProtocol';
import { useTranslate } from '@renderer/hooks/useTranslate';
import { Outlet } from '@tanstack/react-router';

export const Layout = () => {
  const DEBUG_UI = false;

  const auth = useAuth();

  const { isRtl } = useTranslate();

  useProtocol();

  return (
    <div
      dir={isRtl ? 'rtl' : 'ltr'}
      className={cn(DEBUG_UI && 'debug', 'flex flex-col h-screen')}
    >
      {auth.isAuth && <Navbar />}
      <div className="flex-1 flex h-full overflow-hidden">
        {auth.isAuth && <Sidebar />}
        <main className="flex-1 flex overflow-y-auto bg-white">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
