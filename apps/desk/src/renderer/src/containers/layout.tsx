import Navbar from '@renderer/components/Navbar'
import Sidebar from '@renderer/components/Sidebar'
import { useAuth } from '@renderer/hooks/useAuth'
import { useProtocol } from '@renderer/hooks/useProtocol'
import { useTranslate } from '@renderer/hooks/useTranslate'
import { Outlet } from '@tanstack/react-router'

export const Layout = () => {
  const auth = useAuth()

  const { isRtl} = useTranslate()
  useProtocol()

  return (
    <>
      <div dir={isRtl ? 'rtl' : 'ltr'} className="flex flex-col h-full">
        {auth.isAuth && <Navbar />}
        <div className="flex-1 flex h-full">
          {auth.isAuth && <Sidebar />}
          <main className="flex-1 bg-white p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  )
}
