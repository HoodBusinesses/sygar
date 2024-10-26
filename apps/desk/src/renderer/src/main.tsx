// renderer/pages/_app.tsx
import { LanguageProvider } from "./contexts/LanguageContext";
import { PermissionsProvider } from "./contexts/PermissionsContext";
import { PersistentStoreProvider } from "./contexts/PersistentStoreContext";
import { ToastContainer } from "react-toastify";
import "./assets/globals.css";
import 'react-toastify/dist/ReactToastify.css';
import { QueryClient, QueryClientProvider } from "react-query";
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'


const queryClient = new QueryClient()
const hooks = {
  beforeSave: (data: any) => console.log("Before Save:", data),
  afterSave: (data: any) => console.log("After Save:", data),
  onConnectionCut: () => console.log("Connection Cut"),
  onConnect: () => console.log("Connected"),
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <PermissionsProvider>
      <LanguageProvider>
        <PersistentStoreProvider hooks={hooks}>
          <ToastContainer />
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
        </PersistentStoreProvider>
      </LanguageProvider>
    </PermissionsProvider>
  </React.StrictMode>
)
