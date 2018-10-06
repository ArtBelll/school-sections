import * as Knex from 'knex';
import {StudentChannel} from '../../commons/channel/student-channel';
import {AbstractDao} from './abstract-dao';
import {AbstractChannel} from '../../commons/channel/abstract-channel';
import {ipcMain} from 'electron';
import {log} from '../../logs-setting';

export class StudentDao extends AbstractDao {

  private readonly studentChannel: StudentChannel;

  constructor(session: Knex) {
    super(session);
    this.studentChannel = new StudentChannel();
    this.initCommonChannels();
    this.initDelete();
  }


  private initDelete() {
    const channel = this.studentChannel.channelDelete;
    console.log(channel);
    ipcMain.on(channel.send, (event, studentId, msgId) => {
      return this.getSession()
        .from(this.studentChannel.getTableName())
        .where('id', studentId)
        .del()
        .then(result => {
          console.log(result);
          if (result > 0) {
            event.sender.send(channel.on + ':' + msgId);
          }
        });
    });
  }

  protected getChannel(): AbstractChannel {
    return this.studentChannel;
  }
}
