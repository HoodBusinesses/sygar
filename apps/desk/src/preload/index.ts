import { contextBridge, ipcRenderer } from 'electron';

// Custom APIs for renderer
const api = {};

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', {
      openExternal: (url) => ipcRenderer.invoke('open-external', url),
      onTokenReceived: (callback: any) => {
        console.log('isfired');
        ipcRenderer.on('token-received', (_event, token) => callback(token));
      },
      removeTokenListeners: () => {
        ipcRenderer.off('token-received', () => {});
      },
      sendPing: () => ipcRenderer.send('ping'),
    });
    contextBridge.exposeInMainWorld('api', api);
  } catch (error) {
    console.error(error);
  }
} else {
  // Fallback for non-isolated environments
  // @ts-ignore
  window.electron = {
    onTokenReceived: (callback: (token: string) => void) => {
      console.log('isfired');
      ipcRenderer.on('token-received', (_event, token) => callback(token));
    },
    removeTokenListeners: () => {
      ipcRenderer.off('token-received', () => {});
    },
    sendPing: () => ipcRenderer.send('ping'),
  };

  // @ts-ignore
  window.api = {};
}
