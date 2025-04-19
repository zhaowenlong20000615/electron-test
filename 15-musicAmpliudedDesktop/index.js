const { app, BrowserWindow, ipcMain } = require("electron");

let win;

const createWindow = () => {
  win = new BrowserWindow({
    width: 400,
    height: 650,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  win.loadFile("./window/index.html");
};

app.whenReady().then(() => {
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

ipcMain.on("minimizeWindow", () => {
  win.minimize();
});

ipcMain.on("closeWindow", () => {
  win.close();
});
