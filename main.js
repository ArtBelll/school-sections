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
        backgroundColor: '#fff'
    });
    mainWindow.maximize();
    mainWindow.loadURL("file://" + __dirname + "/dist/index.html");
    mainWindow.webContents.openDevTools();
    mainWindow.on('close', function () {
        mainWindow = null;
    });
    electron_1.ipcMain.on('test-insert', function (event, section) {
        log.info(console.log(section));
    });
}
electron_1.app.on('ready', createWindow);
electron_1.app.on('window-all-closed', function () {
    electron_1.app.quit();
});
