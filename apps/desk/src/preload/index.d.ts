import { ElectronAPI } from '@electron-toolkit/preload';
// global.d.ts

declare global {
  interface ElectronAPI {
    onTokenReceived: (callback: (token: string) => void) => void;
    removeTokenListeners: () => void;

    sendPing: () => void;
  }

  interface Window {
    electron: ElectronAPI; // Typed Electron API exposed through contextBridge
    api: Record<string, unknown>; // Use a better type than unknown if possible
  }
}

// Ensure this file is treated as a module
export {};
