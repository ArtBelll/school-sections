import {MethodChannel} from '../method-channel';

export abstract class AbstractChannel {

  channelInsert(): MethodChannel {
    return this.getChannelName('insert')
  }

  channelGetAll(): MethodChannel {
    return this.getChannelName('get-all')
  }

  protected getChannelName(method: string): MethodChannel {
    return new MethodChannel(this.getTableName(), method);
  }

  abstract getTableName(): string;
}
