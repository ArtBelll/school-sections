import {MethodChannel} from '../method-channel';
import {FluxMethodChannel} from '../flux-method-channel';

export abstract class AbstractChannel {

  channelInsert: MethodChannel;
  channelFindOne: MethodChannel;
  channelGetAll: MethodChannel;
  channelUpdate: MethodChannel;
  channelDelete: MethodChannel;

  protected constructor() {
    this.channelInsert = this.getChannelName('insert');
    this.channelFindOne = this.getChannelName('find-one');
    this.channelGetAll = this.getChannelName('get-all');
    this.channelUpdate = this.getChannelName('update');
    this.channelDelete = this.getChannelName('delete')
  }

  protected getChannelName(method: string): MethodChannel {
    return new MethodChannel(this.getTableName(), method);
  }

  protected getFluxChannelName(method: string): FluxMethodChannel {
    return new FluxMethodChannel(this.getTableName(), method);
  }

  abstract getTableName(): string;
}
