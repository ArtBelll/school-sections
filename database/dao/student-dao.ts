import * as Knex from 'knex';
import {StudentChannel} from '../../commons/channel/student-channel';
import {AbstractDao} from './abstract-dao';
import {AbstractChannel} from '../../commons/channel/abstract-channel';
import {ipcMain} from 'electron';
import {Section} from '../../commons/domain/section';

export class StudentDao extends AbstractDao {

  private readonly studentChannel: StudentChannel;

  constructor(session: Knex) {
    super(session);
    this.studentChannel = new StudentChannel();
    this.initCommonChannels();
  }

  protected getChannel(): AbstractChannel {
    return this.studentChannel;
  }
}
