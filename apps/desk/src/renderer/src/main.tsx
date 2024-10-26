import { ToastContainer } from "react-toastify";
import "./assets/globals.css";
import 'react-toastify/dist/ReactToastify.css';
import React from 'react'
import ReactDOM from 'react-dom/client'
import { I18nProvider } from '@renderer/providers/i18n'
import { ReactQueryProvider } from "./providers/react-query";
import { ReactRouterProvider } from "./providers/router";



ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <I18nProvider>
      <ToastContainer />
      <ReactQueryProvider>
        <ReactRouterProvider />
      </ReactQueryProvider>
    </I18nProvider>
  </React.StrictMode>
)
