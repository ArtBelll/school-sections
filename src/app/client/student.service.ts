import {Injectable} from '@angular/core';
import {StudentChannel} from '../../../commons/channel/student-channel';
import {DbClient} from './db-client';
import {Observable} from 'rxjs/Observable';
import {Student} from '../../../commons/domain/student';
import {Section} from '../../../commons/domain/section';

@Injectable()
export class StudentService {

  private studentChannel: StudentChannel;

  constructor(private dbClient: DbClient) {
    this.studentChannel = new StudentChannel();
  }

  public add(student: Student): Observable<void> {
    student.classCharacter = student.classCharacter.toUpperCase();
    return this.dbClient.do(this.studentChannel.channelInsert(), student);
  }

  public getAll(): Observable<Student[]> {
    return this.dbClient.do<Student[]>(this.studentChannel.channelGetAll());
  }

}
