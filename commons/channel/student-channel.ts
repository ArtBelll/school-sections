import {AbstractChannel} from './abstract-channel';
import {FluxMethodChannel} from '../flux-method-channel';

export class StudentChannel extends AbstractChannel {

  constructor() {
    super();
  }

  getTableName(): string {
    return 'students';
  }
}
