import * as Knex from 'knex';
import {ipcMain} from 'electron';
import {log} from '../../logs-setting';

export class SectionDao {

  static readonly TABLE = 'sections';
  static readonly PREFIX = `sections-`;

  session: Knex;

  constructor(session: Knex) {
    this.session = session;
    this.insert();
  }

  insert() {
    ipcMain.on(`${SectionDao.PREFIX}insert`, (event, section) => {
      log.info("Done");
      console.log(this.session.insert(section, 'id').into(SectionDao.TABLE).thenReturn());
    });
  }
}
