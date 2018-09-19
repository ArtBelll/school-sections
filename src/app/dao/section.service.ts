import {Injectable} from '@angular/core';
import {Section} from '../domain/section';

declare var electron: any;

@Injectable()
export class SectionService {

  public testInsert(): void {
    electron.ipcRenderer.send('test-insert', new Section('Test', false));
  }
}
