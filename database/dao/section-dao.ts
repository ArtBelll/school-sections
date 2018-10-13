import * as Knex from 'knex';
import {ipcMain} from 'electron';
import {log} from '../../logs-setting';
import {SectionChannel} from '../../commons/channel/section-channel';
import {AbstractDao} from './abstract-dao';
import {AbstractChannel} from '../../commons/channel/abstract-channel';

export class SectionDao extends AbstractDao {

  private readonly sectionChannel: SectionChannel;

  constructor(session: Knex) {
    super(session);
    this.sectionChannel = new SectionChannel();
    this.initCommonChannels();
    this.initGetSectionsByStudent();
    this.initDelete();
  }

  private initDelete() {
    const channel = this.sectionChannel.channelDelete;
    ipcMain.on(channel.send, (event, sectionId, msgId) => {
      this.getSession()
        .delete()
        .from(this.sectionChannel.getTableName())
        .where('id', sectionId)
        .then(result => {
          if (result > 0) {
            this.getSession()
              .delete()
              .from('section_student')
              .where('sectionId', sectionId)
              .then();
            event.sender.send(channel.on + ':' + msgId);
          }
        });
    });
  }
  private initGetSectionsByStudent() {
    const channel = this.sectionChannel.channelGetSections;
    ipcMain.on(channel.send, (event, studentId, msgId) => {
      return this.getSession().select('sections.id', 'sections.name', 'sections.isSport')
        .from('sections')
        .join('section_student', function () {
          this.on('sections.id', 'section_student.sectionId');
        })
        .where('section_student.studentId', studentId)
        .then(section => {
          event.sender.send(channel.on + ':' + msgId, section);
        })
        .catch(err => {
          log.error(err);
          event.sender.send(channel.error, err);
        });
    });
  }

  protected getChannel(): AbstractChannel {
    return this.sectionChannel;
  }
}
