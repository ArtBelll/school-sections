import * as Knex from 'knex';
import {ipcMain} from 'electron';
import {log} from '../../logs-setting';
import {Section} from '../domain/section';

export class SectionDao {

  static readonly TABLE = 'sections';
  static readonly PREFIX = `sections-`;

  session: Knex;

  constructor(session: Knex) {
    this.session = session;
    this.initInsert();
    this.initSelectAllSections();
  }

  initInsert() {
    ipcMain.on(`${SectionDao.PREFIX}insert`, (event, section) => {
      log.info('Insert section:', JSON.stringify(section));
      this.session.insert(section, 'id').into(SectionDao.TABLE).then(() => {
        log.info('Insert successful');
      })
        .catch(err => {
          log.error('Insert error', err);
        });
    });
  }

  initSelectAllSections() {
    ipcMain.on(`${SectionDao.PREFIX}get-all`, (event) => {
      this.session.select('*')
        .from(SectionDao.TABLE)
        .then((sections: Section[]) => {
          event.sender.send('sections:get-all:on', sections);
        });
    });
  }
}
