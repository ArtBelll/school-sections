import * as Knex from 'knex';
import {StudentChannel} from '../../commons/channel/student-channel';
import {AbstractDao} from './abstract-dao';
import {AbstractChannel} from '../../commons/channel/abstract-channel';

export class StudentDao extends AbstractDao {

  private readonly studentChannel: StudentChannel;

  constructor(session: Knex) {
    super(session);
    this.studentChannel = new StudentChannel();
    this.initCommonChannels();
    // this.initSelectAllSections();
  }

  protected getChannel(): AbstractChannel {
    return this.studentChannel;
  }

}
