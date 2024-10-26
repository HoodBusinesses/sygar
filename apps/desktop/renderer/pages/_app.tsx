// renderer/pages/_app.tsx
import React from "react";
import Layout from "../components/Layout";
import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import { LanguageProvider } from "../contexts/LanguageContext";
import { PermissionsProvider } from "../contexts/PermissionsContext";
import { PersistentStoreProvider } from "../contexts/PersistentStoreContext";
import { ToastContainer } from "react-toastify";
import "../public/localization/i18n";
import "../styles/globals.css";
import 'react-toastify/dist/ReactToastify.css';
import { QueryClient, QueryClientProvider } from "react-query";
import { queryObjects } from "v8";

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {
  const hooks = {
    beforeSave: (data: any) => console.log("Before Save:", data),
    afterSave: (data: any) => console.log("After Save:", data),
    onConnectionCut: () => console.log("Connection Cut"),
    onConnect: () => console.log("Connected"),
  };

  return (
    <PermissionsProvider>
      <LanguageProvider>
        <PersistentStoreProvider hooks={hooks}>
          <ToastContainer />
          <QueryClientProvider client={queryClient}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </QueryClientProvider>
        </PersistentStoreProvider>
      </LanguageProvider>
    </PermissionsProvider>
  );
}

export default appWithTranslation(MyApp);
