import {ipcMain} from 'electron';
import {log} from '../../logs-setting';
import {AbstractChannel} from '../../commons/channel/abstract-channel';
import * as Knex from 'knex';
import {Section} from '../../commons/domain/section';

export abstract class AbstractDao {

  private readonly session: Knex;

  protected constructor(session: Knex) {
    this.session = session;
  }

  protected initCommonChannels() {
    this.initInsert();
    this.initSelectAll();
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
    ipcMain.on(channel.send, (event, value) => {
      log.info('Insert section:', JSON.stringify(value));
      this.session.insert(value, 'id')
        .into(this.getTableName())
        .then(() => {
          log.info('Insert successful');
        })
        .catch(err => {
          log.error('Insert error', err);
        });
    });
  }

  private initSelectAll() {
    const channel = this.getChannel().channelGetAll();
    ipcMain.on(channel.send, (event) => {
      this.session.select('*')
        .from(this.getChannel().getTableName())
        .then((values) => {
          event.sender.send(channel.on, values);
        });
    });
  }

}
