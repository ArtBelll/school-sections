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
    ipcMain.on(channel.send, (event, studentId, msgId) => {
      return this.getSession()
        .delete()
        .from(this.studentChannel.getTableName())
        .where('id', studentId)
        .then(result => {
          if (result > 0) {
            this.getSession()
              .delete()
              .from('section_student')
              .where('studentId', studentId)
              .then();
            event.sender.send(channel.on + ':' + msgId);
          }
        });
    });
  }

  protected getChannel(): AbstractChannel {
    return this.studentChannel;
  }
}
