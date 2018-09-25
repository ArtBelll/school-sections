import {Injectable, NgZone} from '@angular/core';
import {MethodChannel} from '../../../commons/method-channel';
import {FluxMethodChannel} from '../../../commons/flux-method-channel';
import {ElectronService} from 'ngx-electron';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/first';

@Injectable()
export class DbClient {

  constructor(private electronService: ElectronService, private ngZone: NgZone) {
  }

  do<T>(channel: MethodChannel, arg?: any): Observable<T> {
    const ipcRenderer = this.electronService.ipcRenderer;
    return new Observable<T>(observer => {
      const successListener = (event, value) => {
        this.ngZone.run(() => {
          console.log(value);
          observer.next(value);
        });
      };
      const errorListener = (event, errorMessage) => {
        console.log(errorMessage);
        this.ngZone.run(() => {
          observer.error(errorMessage);
        });
      };

      const msgId = this.makeId();
      ipcRenderer.send(channel.send, arg, msgId);
      ipcRenderer.on(`${channel.on}:${msgId}`, successListener);
      ipcRenderer.on(channel.error, errorListener);

      return {
        unsubscribe() {
          ipcRenderer.removeListener(channel.on, successListener);
          ipcRenderer.removeListener(channel.error, errorListener);
        }
      };
    }).first();
  }

  doFlux<T>(channel: FluxMethodChannel, array: any[]): Observable<T> {
    const ipcRenderer = this.electronService.ipcRenderer;
    return new Observable<T>(observer => {
      const successListener = (event, value) => {
        observer.next(value);
      };
      const errorListener = (event, errorMessage) => {
        console.log(errorMessage);
        observer.error(errorMessage);
      };
      const endListener = event => {
        observer.unsubscribe();
      };

      ipcRenderer.send(channel.send, array);
      ipcRenderer.on(channel.on, successListener);
      ipcRenderer.on(channel.error, errorListener);
      ipcRenderer.on(channel.end, endListener);

      return {
        unsubscribe() {
          ipcRenderer.removeListener(channel.on, successListener);
          ipcRenderer.removeListener(channel.error, errorListener);
          ipcRenderer.removeListener(channel.end, endListener);
        }
      };
    });
  }

  private makeId() {
    let text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }

}
