import { app, BrowserWindow, ipcMain } from 'electron';
import process from 'process';

let win;

const createWindow = () => {
  win = new BrowserWindow({
    width: 400,
    height: 670,
    transparent: true,
    frame: false,
    webPreferences: { 
      nodeIntegration: true,
      contextIsolation: false,
     }
  })
  win.loadURL(process.argv[2])
  // win.webContents.openDevTools()
}

app.whenReady().then(() => {
  createWindow();
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
})

ipcMain.on("minimaizeWindow", () => {
  win.minimize();
});

ipcMain.on("closeWindow", () => {
  win.close();
});



