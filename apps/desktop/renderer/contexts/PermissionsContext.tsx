// renderer/contexts/PermissionsContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
// Define the shape of the permissions object
interface Permissions {
  [key: string]: {
    canView: boolean;
    canModify: boolean;
  };
}

// Create a context for permissions
const PermissionsContext = createContext<Permissions | null>(null);

// Custom hook to use permissions context
export const usePermissions = () => useContext(PermissionsContext);

// Permissions Provider Component
export const PermissionsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [permissions, setPermissions] = useState<Permissions | null>(null);

  useEffect(() => {
    // Simulate fetching permissions from an API or other source
    const fetchPermissions = async () => {
      // Simulated API response
      const response: Permissions = {
        registration: { canView: true, canModify: false },
        organizations: { canView: false, canModify: false },
      };
      setPermissions(response);
    };

    fetchPermissions();
  }, []);

  if (!permissions) {
    return <div>Loading...</div>;
  }

  return (
    <PermissionsContext.Provider value={permissions}>
      {children}
    </PermissionsContext.Provider>
  );
};
