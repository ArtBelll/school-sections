import {app, BrowserWindow} from 'electron';
import {Database} from './database/database';
const path = require('path');
const dbPath = path.resolve(process.resourcesPath, 'data.db');

class SchoolSectionsApp {

  mainWindow: BrowserWindow;

  constructor() {
    this.mainWindow = this.createWindow();
    this.connectionToDataBase()
  }

  private createWindow(): BrowserWindow {
    const mainWindow = new BrowserWindow({
      width: 600,
      height: 600,
      backgroundColor: '#fff',
      icon: `file://${__dirname}/dist/view/favicon.ico`
    });

    mainWindow.maximize();
    mainWindow.loadURL(`file://${__dirname}/dist/index.html`);
    mainWindow.webContents.openDevTools();

    return mainWindow;
  }

  private connectionToDataBase() {
    new Database(dbPath);
  }
}

app.on('ready', () => new SchoolSectionsApp());

app.on('window-all-closed', () => {
  app.quit();
});

// ipcMain.on('test-insert', (event, section) => {
//   console.log("TT");
// });
