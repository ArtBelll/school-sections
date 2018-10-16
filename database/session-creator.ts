import Knex = require('knex');
import {dialog} from 'electron';
import log from 'electron-log';

export abstract class SessionCreator {

  static connection(filename: string): Knex {
    log.info(filename);
    const session = Knex({
      client: 'sqlite3',
      connection: {
        filename: filename
      },
      useNullAsDefault: true
    });

    log.info('Try connection to DB');
    session.schema.hasTable('sections')
      .then(exists => {
        if (!exists) {
          log.error('Connection failed');
          dialog.showErrorBox('Application Error', 'Database connection error');
          process.exit(1);
        }
        else {
          log.info('Connection success!');
        }
      });

    return session;
  }
}
