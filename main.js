const { app, BrowserWindow, dialog } = require('electron');
const log = require('simple-node-logger').createSimpleLogger('project.log');

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

  log.info('Try connection to DB');
  const session = require('knex')({
    client: 'sqlite3',
    connection: {
      filename: `./data.db`
    },
    useNullAsDefault: true
  });

  session.schema.hasTable('sections')
    .then(exists => {
      if (!exists) {
        log.error("Connection failed");
        dialog.showErrorBox('Application Error', 'Database connection error');
        process.exit(1);
      }
      else {
        log.info("Connection success!");
      }
    });
}

app.on('ready', createWindow);

app.on('window-all-close', function () {
  app.quit();
});
