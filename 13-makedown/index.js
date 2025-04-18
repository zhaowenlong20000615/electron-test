const { app, BrowserWindow } = require('electron')
require('electron-reload')(__dirname)
require('./menu')

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
          nodeIntegration: true,
          contextIsolation: false,
        }
    })

    win.loadFile('window/index.html')
    return win
}

app.whenReady().then(() => {
    createWindow()
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})


