import {Injectable} from '@angular/core';
import {Section} from '../../../database/domain/section';
import {Observable} from 'rxjs/Observable';
import {SectionChannel} from '../../../commons/channel/section-channel';
import 'rxjs/add/operator/first';

declare var electron: any;

@Injectable()
export class SectionService {

  private sectionChannel: SectionChannel;

  private getAllObservable: Observable<Section[]>;

  constructor() {
    this.sectionChannel = new SectionChannel();

    this.setGetAllObservable();
  }

  public add(section: Section): void {
    electron.ipcRenderer.send(this.sectionChannel.channelInsert().send, section);
  }

  public getAll(): Observable<Section[]> {
    return this.getAllObservable.first();
  }

  private setGetAllObservable(): void {
    this.getAllObservable = new Observable(observer => {
      const channel = this.sectionChannel.channelGetAll();

      const successListener = (event, value) => {
        observer.next(value);
      };
      const errorListener = (event, errorMessage) => {
        console.log(errorMessage);
        observer.error(errorMessage);
      };

      electron.ipcRenderer.send(channel.send);
      electron.ipcRenderer.on(channel.on, successListener);
      electron.ipcRenderer.on(channel.error, errorListener);

      return {
        unsubscribe() {
          electron.ipcRenderer.removeListener(channel.on, successListener);
          electron.ipcRenderer.removeListener(channel.error, errorListener);
        }
      }
    })
  }
}
