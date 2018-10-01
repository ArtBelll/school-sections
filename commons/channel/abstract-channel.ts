import {MethodChannel} from '../method-channel';
import {FluxMethodChannel} from '../flux-method-channel';

export abstract class AbstractChannel {

  channelInsert: MethodChannel;
  channelFindOne: MethodChannel;
  channelGetAll: MethodChannel;

  protected constructor() {
    this.channelInsert = this.getChannelName('insert');
    this.channelFindOne = this.getChannelName('find-one');
    this.channelGetAll = this.getChannelName('get-all');
  }

  protected getChannelName(method: string): MethodChannel {
    return new MethodChannel(this.getTableName(), method);
  }

  protected getFluxChannelName(method: string): FluxMethodChannel {
    return new FluxMethodChannel(this.getTableName(), method);
  }

  abstract getTableName(): string;
}
