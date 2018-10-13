import {AbstractChannel} from './abstract-channel';
import {MethodChannel} from '../method-channel';

export class StudentChannel extends AbstractChannel {

  channelAddSections: MethodChannel;
  channelDeleteSections: MethodChannel;

  constructor() {
    super();
    this.channelAddSections = this.getChannelName('add-sections');
    this.channelDeleteSections = this.getChannelName('delete-sections');
  }

  getTableName(): string {
    return 'students';
  }
}
