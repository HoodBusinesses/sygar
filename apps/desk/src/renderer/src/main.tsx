import { ToastContainer } from "react-toastify";
import "./assets/globals.css";
import 'react-toastify/dist/ReactToastify.css';
import React from 'react'
import ReactDOM from 'react-dom/client'
import { ReactQueryProvider } from "./providers/react-query";
import { ReactRouterProvider } from "./providers/router";
import StoreProvider from "./providers/redux-store";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <StoreProvider>
      <ToastContainer />
      <ReactQueryProvider>
        <ReactRouterProvider />
      </ReactQueryProvider>
    </StoreProvider>
  </React.StrictMode>
)
