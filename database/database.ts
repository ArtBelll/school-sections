import {SessionCreator} from './session-creator';
import {SectionDao} from './dao/section-dao';
import {StudentDao} from './dao/student-dao';

export class Database {
  constructor(filename: string) {
    const session = SessionCreator.connection(filename);
    new SectionDao(session);
    new StudentDao(session);
  }
}

