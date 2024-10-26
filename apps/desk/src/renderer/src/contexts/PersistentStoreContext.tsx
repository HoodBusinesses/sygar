import React, { createContext, useContext, useState, useEffect } from "react";

interface PersistentStoreContextProps {
  data: any;
  saveData: (newData: any) => void;
}

const PersistentStoreContext = createContext<PersistentStoreContextProps | undefined>(undefined);

interface PersistentStoreProviderProps {
  hooks?: any;
  children: React.ReactNode;
}

export const PersistentStoreProvider: React.FC<PersistentStoreProviderProps> = ({ children, hooks }) => {
  const [data, setData] = useState(() => {
    const savedData = localStorage.getItem("persistentStore");
    return savedData ? JSON.parse(savedData) : {};
  });

  useEffect(() => {
    const handleConnectionChange = () => {
      if (navigator.onLine) {
        hooks?.onConnect?.();
      } else {
        hooks?.onConnectionCut?.();
      }
    };

    window.addEventListener("online", handleConnectionChange);
    window.addEventListener("offline", handleConnectionChange);

    return () => {
      window.removeEventListener("online", handleConnectionChange);
      window.removeEventListener("offline", handleConnectionChange);
    };
  }, [hooks]);

  const saveData = (newData: any) => {
    hooks?.beforeSave?.(newData);
    setData(newData);
    localStorage.setItem("persistentStore", JSON.stringify(newData));
    hooks?.afterSave?.(newData);
  };



  return (
    <PersistentStoreContext.Provider value={{ data, saveData }}>
      {children}
    </PersistentStoreContext.Provider>
  );
};

export const usePersistentStore = () => {
  const context = useContext(PersistentStoreContext);
  if (!context) {
    throw new Error("usePersistentStore must be used within a PersistentStoreProvider");
  }
  return context;
};
