import {AbstractChannel} from './abstract-channel';
import {MethodChannel} from '../method-channel';

export class SectionChannel extends AbstractChannel {

  channelGetSections: MethodChannel;

  constructor() {
    super();
    this.channelGetSections = this.getFluxChannelName('get-sections');
  }

  getTableName() {
    return 'sections';
  }
}
