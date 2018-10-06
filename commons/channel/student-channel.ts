import {AbstractChannel} from './abstract-channel';
import {MethodChannel} from '../method-channel';

export class StudentChannel extends AbstractChannel {

  channelAddSections: MethodChannel;

  constructor() {
    super();
    this.channelAddSections = this.getChannelName('add-sections');
  }

  getTableName(): string {
    return 'students';
  }
}
