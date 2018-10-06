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
    this.initFindOne();
    this.initSelectAll();
    this.initUpdate();
  }

  protected abstract getChannel(): AbstractChannel;

  protected getSession(): Knex {
    return this.session;
  }

  private getTableName(): string {
    return this.getChannel().getTableName();
  }

  private initInsert() {
    const channel = this.getChannel().channelInsert;
    ipcMain.on(channel.send, (event, value, msgId) => {
      log.info('Insert:', JSON.stringify(value));
      this.session.insert(value, 'id')
        .into(this.getTableName())
        .then(result => {
          event.sender.send(channel.on + ':' + msgId, result[0]);
          log.info('Insert successful');
        })
        .catch(err => {
          log.error('Insert error', err);
        });
    });
  }

  private initFindOne() {
    const channel = this.getChannel().channelFindOne;
    ipcMain.on(channel.send, (event, id, msgId) => {
      this.session.select('*')
        .from(this.getChannel().getTableName())
        .where(`${this.getChannel().getTableName()}.id`, id)
        .then(result => {
          event.sender.send(channel.on + ':' + msgId, result[0]);
        });
    });
  }

  private initSelectAll() {
    const channel = this.getChannel().channelGetAll;
    ipcMain.on(channel.send, (event, arg, msgId) => {
      this.session.select('*')
        .from(this.getChannel().getTableName())
        .then(values => {
          event.sender.send(channel.on + ':' + msgId, values);
        });
    });
  }

  private initUpdate() {
    const channel = this.getChannel().channelUpdate;
    ipcMain.on(channel.send, (event, value, msgId) => {
      const id = value.id;
      value.id = undefined;
      this.session.update(value)
        .where('id', id)
        .from(this.getChannel().getTableName())
        .then(id => {
          event.sender.send(channel.on + ':' + msgId, id);
        });
    });
  }
}
