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
    icon: `file://${__dirname}/dist/view/favicon.ico`
  });
  mainWindow.maximize();

  mainWindow.loadURL(`file://${__dirname}/dist/view/index.html`);

  mainWindow.webContents.openDevTools();

  ipcMain.on('test-insert', (event, section) => {
    console.log("TT");
  });

  let databaseThread = runDatabase();
  mainWindow.on('close', function () {
    mainWindow = null;
    if (!databaseThread.isDestroyed()) {
      databaseThread.close();
    }
  });
}

function runDatabase() {
  let databaseThread = new BrowserWindow({
    width: 600,
    height: 600,
    backgroundColor: '#fff',
    show: true
  });

  databaseThread.loadURL(`file://${__dirname}/dist/database/database.html`);

  databaseThread.webContents.openDevTools();

  databaseThread.on('close', function () {
    databaseThread = null;
  });

  return databaseThread;
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
  app.quit();
});
