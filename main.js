"use strict";
exports.__esModule = true;
var electron_1 = require("electron");
var SimpleNodeLogger = require('simple-node-logger'), logOpts = {
    logFilePath: 'project.log',
    timestampFormat: 'YYYY-MM-DD HH:mm:ss.SSS'
}, log = require('simple-node-logger').createSimpleLogger(logOpts);
function createWindow() {
    var mainWindow = new electron_1.BrowserWindow({
        width: 600,
        height: 600,
        backgroundColor: '#fff',
        icon: "file://" + __dirname + "/dist/view/favicon.ico"
    });
    mainWindow.maximize();
    mainWindow.loadURL("file://" + __dirname + "/dist/view/index.html");
    mainWindow.webContents.openDevTools();
    electron_1.ipcMain.on('test-insert', function (event, section) {
        console.log("TT");
    });
    var databaseThread = runDatabase();
    mainWindow.on('close', function () {
        mainWindow = null;
        if (!databaseThread.isDestroyed()) {
            databaseThread.close();
        }
    });
}
function runDatabase() {
    var databaseThread = new electron_1.BrowserWindow({
        width: 600,
        height: 600,
        backgroundColor: '#fff',
        show: true
    });
    databaseThread.loadURL("file://" + __dirname + "/dist/database/database.html");
    databaseThread.webContents.openDevTools();
    databaseThread.on('close', function () {
        databaseThread = null;
    });
    return databaseThread;
}
electron_1.app.on('ready', createWindow);
electron_1.app.on('window-all-closed', function () {
    electron_1.app.quit();
});
