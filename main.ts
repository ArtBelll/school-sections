import {app, BrowserWindow, dialog, ipcMain} from 'electron';

const SimpleNodeLogger = require('simple-node-logger'),
  logOpts = {
    logFilePath: 'project.log',
    timestampFormat: 'YYYY-MM-DD HH:mm:ss.SSS'
  },
  log = require('simple-node-logger').createSimpleLogger(logOpts);


function createWindow() {

  let mainWindow = new BrowserWindow({
    width: 600,
    height: 600,
    backgroundColor: '#fff',
    // TODO: icon: `file://${__dirname}/dist/assets/logo.png`
  });
  mainWindow.maximize();

  mainWindow.loadURL(`file://${__dirname}/dist/index.html`);

  mainWindow.webContents.openDevTools();

  mainWindow.on('close', function () {
    mainWindow = null;
  });

  ipcMain.on('test-insert', (event, section) => {

  });
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
  app.quit();
});
