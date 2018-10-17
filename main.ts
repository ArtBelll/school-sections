import {app, BrowserWindow} from 'electron';
import {Database} from './database/database';
import * as fs from 'fs';
const path = require('path');
import { autoUpdater } from "electron-updater"

const dbPathDev = path.resolve(__dirname, 'data.db');
const dbPathProd = path.resolve(process.resourcesPath, 'data.db');

class SchoolSectionsApp {

  env: String;
  mainWindow: BrowserWindow;

  constructor() {
    autoUpdater.checkForUpdatesAndNotify();

    this.env = fs.existsSync(dbPathDev) ? 'dev' : 'prod';
    this.mainWindow = this.createWindow();
    this.connectionToDataBase();
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
    if (this.env === 'dev') {
      mainWindow.webContents.openDevTools();
    }

    return mainWindow;
  }

  private connectionToDataBase() {
      this.env === 'dev' ? new Database(dbPathDev) : new Database(dbPathProd);
  }
}

app.on('ready', () => new SchoolSectionsApp());

app.on('window-all-closed', () => {
  app.quit();
});


