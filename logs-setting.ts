const logOpts = {
  logFilePath: 'project.log',
  timestampFormat: 'YYYY-MM-DD HH:mm:ss.SSS'
};
export const log = require('simple-node-logger').createSimpleLogger(logOpts);
