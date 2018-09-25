export class MethodChannel {
  private readonly table: string;
  private readonly method: string;
  readonly send: string;
  readonly on: string;
  readonly error: string;

  constructor(table: string, method: string) {
    this.table = table;
    this.method = method;

    this.send = this.getChannelName('send');
    this.on = this.getChannelName('on');
    this.error = this.getChannelName('error');
  }

  protected getChannelName(event: string) {
    return `${this.table}:${this.method}:${event}`;
  }
}
