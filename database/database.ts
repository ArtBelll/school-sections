import {SessionCreator} from './dao/session-creator';
import {SectionDao} from './dao/section-dao';

export class Database {
  constructor(filename: string) {
    const session = SessionCreator.connection(filename);
    new SectionDao(session);
  }
}

