const { app, BrowserWindow } = require('electron');

let mainWindow;

function createWindow() {

  mainWindow = new BrowserWindow({
    width: 600,
    height: 600,
    backgroundColor: '#fff',
    // TODO: icon: `file://${__dirname}/dist/assets/logo.png`
  });

  mainWindow.loadURL(`file://${__dirname}/dist/index.html`);

  mainWindow.webContents.openDevTools();

  mainWindow.on('close', function () {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-close', function () {
  app.quit();
});
