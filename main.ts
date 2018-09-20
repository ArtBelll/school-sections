import {app, BrowserWindow, dialog, ipcMain} from 'electron';
import {Database} from './database/database';

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
    new Database(`${__dirname}/data.db`);
  }
}

app.on('ready', () => new SchoolSectionsApp());

app.on('window-all-closed', () => {
  app.quit();
});

// ipcMain.on('test-insert', (event, section) => {
//   console.log("TT");
// });
