import {Injectable} from '@angular/core';
import {Section} from '../../../database/domain/section';
import {Observable} from 'rxjs/Observable';

declare var electron: any;

@Injectable()
export class SectionService {

  public add(section: Section): void {
    electron.ipcRenderer.send('sections-insert', section);
  }

  public getAll(): Observable<Section[]> {
    return new Observable(observer => {
      const {next, error} = observer;
      const listener =(event, sections) => {
        return next(sections);
      };

      electron.ipcRenderer.send('sections-get-all');
      electron.ipcRenderer.on('sections:get-all:on', listener);
      electron.ipcRenderer.removeListener('sections:get-all:on', listener)
    });
  }
}
