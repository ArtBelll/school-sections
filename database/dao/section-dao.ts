import * as Knex from 'knex';
import {ipcMain} from 'electron';
import {log} from '../../logs-setting';
import {Section} from '../../commons/domain/section';
import {SectionChannel} from '../../commons/channel/section-channel';

export class SectionDao {

  private session: Knex;
  private sectionChannel: SectionChannel;
  private tableName: string;

  constructor(session: Knex) {
    this.session = session;
    this.sectionChannel = new SectionChannel();
    this.tableName = this.sectionChannel.getTableName();
    this.initInsert();
    this.initSelectAllSections();
  }

  initInsert() {
    const channel = this.sectionChannel.channelInsert();
    ipcMain.on(channel.send, (event, section) => {
      log.info('Insert section:', JSON.stringify(section));
      this.session.insert(section, 'id').into(this.tableName).then(() => {
        log.info('Insert successful');
      })
        .catch(err => {
          log.error('Insert error', err);
        });
    });
  }

  initSelectAllSections() {
    const channel = this.sectionChannel.channelGetAll();
    ipcMain.on(channel.send, (event) => {
      this.session.select('*')
        .from(this.tableName)
        .then((sections: Section[]) => {
          event.sender.send(channel.on, sections);
        });
    });
  }
}
