import {Injectable} from '@angular/core';
import {Section} from '../../../commons/domain/section';
import {SectionChannel} from '../../../commons/channel/section-channel';
import {DbClient} from './db-client';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class SectionService {

  private sectionChannel: SectionChannel;

  constructor(private dbClient: DbClient) {
    this.sectionChannel = new SectionChannel();
  }

  public add(section: Section): Observable<number> {
    return this.dbClient.do<number>(this.sectionChannel.channelInsert, section);
  }

  public get(sectionId: number): Observable<Section> {
    return this.dbClient.do<Section>(this.sectionChannel.channelFindOne, sectionId);
  }

  public getAll(): Observable<Section[]> {
    return this.dbClient.do(this.sectionChannel.channelGetAll);
  }

  public getSectionsByStudent(studentId: number): Observable<Section[]> {
    return this.dbClient.do<Section[]>(this.sectionChannel.channelGetSections, studentId);
  }
}
