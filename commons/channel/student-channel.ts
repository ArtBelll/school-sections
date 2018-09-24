import {AbstractChannel} from './abstract-channel';

export class StudentChannel extends AbstractChannel {

  getTableName(): string {
    return 'students';
  }
}
