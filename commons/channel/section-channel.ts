import {AbstractChannel} from './abstract-channel';

export class SectionChannel extends AbstractChannel {

  getTableName() {
    return 'sections';
  }
}
