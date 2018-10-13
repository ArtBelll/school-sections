import * as Knex from 'knex';
import {StudentChannel} from '../../commons/channel/student-channel';
import {AbstractDao} from './abstract-dao';
import {AbstractChannel} from '../../commons/channel/abstract-channel';
import {ipcMain} from 'electron';
import {StudentSectionsDTO} from '../dto/student-sections-dto';

export class StudentDao extends AbstractDao {

  private readonly studentChannel: StudentChannel;

  constructor(session: Knex) {
    super(session);
    this.studentChannel = new StudentChannel();
    this.initCommonChannels();
    this.initDelete();
    this.initAddSections();
    this.initDeleteSections();
  }

  private initDelete() {
    const channel = this.studentChannel.channelDelete;
    ipcMain.on(channel.send, (event, studentId, msgId) => {
      this.getSession()
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

  private initAddSections() {
    const channel = this.studentChannel.channelAddSections;
    ipcMain.on(channel.send, (event, dto: StudentSectionsDTO, msgId) => {
      const insertRows = dto.sectionIds
        .map(sectionId => {
          return {studentId: dto.studentId, sectionId: sectionId};
        });
      this.getSession()
        .insert(insertRows)
        .into('section_student')
        .then(() => {
          event.sender.send(channel.on + ':' + msgId, dto.sectionIds);
        });
    });
  }

  private initDeleteSections() {
    const channel = this.studentChannel.channelDeleteSections;
    ipcMain.on(channel.send, (event, dto: StudentSectionsDTO, msgId) => {
      this.getSession()
        .delete()
        .from('section_student')
        .where('studentId', dto.studentId)
        .whereIn('sectionId', dto.sectionIds)
        .then(() => {
          event.sender.send(channel.on + ':' + msgId, dto.studentId);
        })
        .catch(e => console.log(e));
    });
  }

  protected getChannel(): AbstractChannel {
    return this.studentChannel;
  }
}
