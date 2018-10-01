import {AbstractChannel} from './abstract-channel';

export class StudentChannel extends AbstractChannel {

  constructor() {
    super();
  }

  getTableName(): string {
    return 'students';
  }
}
