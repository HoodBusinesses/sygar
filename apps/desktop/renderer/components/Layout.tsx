// renderer/components/Layout.tsx
import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useRouter } from "next/router";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const hideLayout = router.pathname === "/signin"; // Adjust this if your sign-in route is different

  return (
    <div className="flex flex-col min-h-screen">
      {!hideLayout && <Navbar />}
      <div className="flex-1 flex">
        {!hideLayout && <Sidebar />}
        <main className="flex-1 bg-white p-6">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
