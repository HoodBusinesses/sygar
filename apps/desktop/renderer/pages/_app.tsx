import React from "react";
import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import "../public/localization/i18n";
import "../styles/globals.css";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="min-h-screen bg-gradient-to-blue p-6 flex flex-col">
          <Component {...pageProps} />
        </main>
      </div>
    </div>
  );
}

export default appWithTranslation(MyApp);
