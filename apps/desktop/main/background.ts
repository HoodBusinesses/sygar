import path from 'path'
import { app, BrowserWindow, ipcMain, screen, Notification, dialog } from 'electron'
import serve from 'electron-serve'
import { createWindow } from './helpers'
import fs from 'fs'

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
  console.log('****** preload.js path:', path.join(__dirname, 'preload.js'));
  

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

ipcMain.on('show-notification', (event, { title, body }) => {
  const notification = new Notification({ title, body });
  notification.show();
});

ipcMain.handle('save-file', async (event, content) => {
  // Get the default save directory
  console.log('saveFile called with content:', content);
  const defaultSavePath = app.getPath('documents'); // You can use 'documents', 'downloads', etc.

  const { canceled, filePath } = await dialog.showSaveDialog({
    title: 'Save File',
    defaultPath: path.join(defaultSavePath, 'filename.txt'), // Use the default save path
    buttonLabel: 'Save',
    filters: [
      { name: 'Text Files', extensions: ['txt'] },
      { name: 'All Files', extensions: ['*'] },
    ],
  });
  if (!canceled && filePath) {
    fs.writeFileSync(filePath, content);
    return 'File saved successfully!';
  } else {
    return 'Save operation canceled';
  }
});


/***
 *    // Set a custom path for user data (example)
 *    app.setPath('userData', '/custom/path/to/user/data');

 *    // Now you can use app.getPath('userData') to get this custom path
 *    const customUserDataPath = app.getPath('userData');
 *    console.log('Custom User Data Path:', customUserDataPath);
 * 
 */