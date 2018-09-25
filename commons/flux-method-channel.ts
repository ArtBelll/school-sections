import {MethodChannel} from './method-channel';

export class FluxMethodChannel extends MethodChannel {

  end: string;

  constructor(table: string, method: string) {
    super(table, method);
    this.end = this.getChannelName('end');
  }

}
