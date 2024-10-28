import Navbar from '@renderer/components/Navbar'
import Sidebar from '@renderer/components/Sidebar'
import { useAuth } from '@renderer/hooks/useAuth'
import { useProtocol } from '@renderer/hooks/useProtocol'
import { Outlet } from '@tanstack/react-router'

export const Layout = () => {
  const auth = useAuth()
  useProtocol()

  return (
    <>
      <div className="flex flex-col h-full">
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
