// renderer/pages/_app.tsx
import React from "react";
import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import "../public/localization/i18n";
import "../styles/globals.css";
import Layout from "../components/Layout";
import { LanguageProvider } from "../contexts/LanguageContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <LanguageProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </LanguageProvider>
  );
}

export default appWithTranslation(MyApp);
