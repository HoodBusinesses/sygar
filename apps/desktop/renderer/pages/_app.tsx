import React from "react";
import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import "../public/localization/i18n";
import "../styles/globals.css";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar/>
      <div className="flex-1 flex">
        <Sidebar />
        <main className="flex-1 bg-white p-6 ">
          <Component {...pageProps} />
        </main>
      </div>
    </div>
  );
}

export default appWithTranslation(MyApp);
