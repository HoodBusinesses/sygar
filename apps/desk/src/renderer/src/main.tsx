import './assets/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ReactQueryProvider } from './providers/react-query';
import { ReactRouterProvider } from './providers/router';
import StoreProvider from './providers/redux-store';
import { ToastContainer } from 'react-toastify';


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ToastContainer />
    <StoreProvider>
      <ReactQueryProvider>
        <ReactRouterProvider />
      </ReactQueryProvider>
    </StoreProvider>
  </React.StrictMode>
);
