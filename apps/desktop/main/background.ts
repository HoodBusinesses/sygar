import path from 'path'
import { app, BrowserWindow, ipcMain, screen } from 'electron'
import serve from 'electron-serve'
import { createWindow } from './helpers'


const isProd = process.env.NODE_ENV === 'production'

if (isProd) {
  serve({ directory: 'app' })
} else {
  app.setPath('userData', `${app.getPath('userData')} (development)`)
}

;(async () => {
  await app.whenReady()

  // Get the primary display's dimensions
  const { width, height } = screen.getPrimaryDisplay().workAreaSize

  const mainWindow = createWindow('main', {
    width: width,
    height: height,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: true, // Ensure this is enabled
    },
  })

  if (isProd) {
    await mainWindow.loadURL('app://')
  } else {
    const port = process.argv[2]
    await mainWindow.loadURL(`http://localhost:${port}`)
    mainWindow.webContents.openDevTools()
  }
})()

app.on('window-all-closed', () => {
  app.quit()
})

ipcMain.on('message', async (event, arg) => {
  event.reply('message', `${arg} World!`)
})

ipcMain.on('auth-success', (event, arg) => {
  console.log('Received auth success message:', arg); // You can log user details if necessary

  // Open the main window or redirect to the authenticated area
  const mainWindow = BrowserWindow.getFocusedWindow();

  if (mainWindow) {
    // Redirect to the authenticated page
    mainWindow.loadURL('app://authenticated');
  } else {
    console.error('Main window not found');
  }
});