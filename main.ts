import {app, BrowserWindow, dialog, ipcMain} from 'electron';
import {Database} from './database/database';

function createWindow() {
  new Database(`${__dirname}/data.db`);

  let mainWindow = new BrowserWindow({
    width: 600,
    height: 600,
    backgroundColor: '#fff',
    icon: `file://${__dirname}/dist/view/favicon.ico`
  });

  mainWindow.maximize();
  mainWindow.loadURL(`file://${__dirname}/dist/index.html`);
  mainWindow.webContents.openDevTools();

  ipcMain.on('test-insert', (event, section) => {
    console.log("TT");
  });

}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
  app.quit();
});
