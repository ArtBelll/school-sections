import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {MethodChannel} from '../../../commons/method-channel';

declare var electron: any;

@Injectable()
export class DbClient {

  constructor() {
  }

  do<T>(channel: MethodChannel, ...args: any[]): Observable<T> {
    return new Observable<T>(observer => {
      const successListener = (event, value) => {
        observer.next(value);
      };
      const errorListener = (event, errorMessage) => {
        console.log(errorMessage);
        observer.error(errorMessage);
      };

      electron.ipcRenderer.send(channel.send, args);
      electron.ipcRenderer.on(channel.on, successListener);
      electron.ipcRenderer.on(channel.error, errorListener);

      return {
        unsubscribe() {
          electron.ipcRenderer.removeListener(channel.on, successListener);
          electron.ipcRenderer.removeListener(channel.error, errorListener);
        }
      };
    }).first();
  }
}
