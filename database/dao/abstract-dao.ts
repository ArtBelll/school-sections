import {ipcMain} from 'electron';
import {log} from '../../logs-setting';
import {AbstractChannel} from '../../commons/channel/abstract-channel';
import * as Knex from 'knex';

export abstract class AbstractDao {

  private readonly session: Knex;

  protected constructor(session: Knex) {
    this.session = session;
  }

  protected initCommonChannels() {
    this.initInsert();
    // this.initSelectAllSections();
  }

  protected abstract getChannel(): AbstractChannel;

  protected getSession(): Knex {
    return this.session;
  }

  private getTableName(): string {
    return this.getChannel().getTableName();
  }

  private initInsert() {
    const channel = this.getChannel().channelInsert();
    ipcMain.on(channel.send, (event, section) => {
      log.info('Insert section:', JSON.stringify(section));
      this.session.insert(section, 'id').into(this.getTableName()).then(() => {
        log.info('Insert successful');
      })
        .catch(err => {
          log.error('Insert error', err);
        });
    });
  }

}
