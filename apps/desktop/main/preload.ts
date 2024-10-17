import { contextBridge, ipcRenderer, IpcRendererEvent, shell } from 'electron'

contextBridge.exposeInMainWorld('electronAPI', {
  openExternal: (url: string) => shell.openExternal(url),
});

contextBridge.exposeInMainWorld('electron', {
  openExternal: (url) => ipcRenderer.send('open-external', url),
});


const handler = {
  send(channel: string, value: unknown) {
    ipcRenderer.send(channel, value)
  },
  on(channel: string, callback: (...args: unknown[]) => void) {
    const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
      callback(...args)
    ipcRenderer.on(channel, subscription)

    return () => {
      ipcRenderer.removeListener(channel, subscription)
    }
  },
}

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    send: (channel, data) => {
      ipcRenderer.send(channel, data);
    }
  }
});


contextBridge.exposeInMainWorld('ipc', handler)

export type IpcHandler = typeof handler
