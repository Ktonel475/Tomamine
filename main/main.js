import { app, BrowserWindow } from 'electron'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 400,
    height: 700,
    autoHideMenuBar: true,
    icon: path.join(__dirname, 'public/winIcon.ico'),
    webPreferences: {
      nodeIntegration: true
    }
  })

  mainWindow.loadFile('dist/index.html')
}

app.whenReady().then(createWindow)