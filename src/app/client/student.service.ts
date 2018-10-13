import {Injectable} from '@angular/core';
import {StudentChannel} from '../../../commons/channel/student-channel';
import {DbClient} from './db-client';
import {Student} from '../../../commons/domain/student';
import {Observable} from 'rxjs/Observable';
import {StudentSectionsDTO} from '../../../database/dto/student-sections-dto';

@Injectable()
export class StudentService {

  private studentChannel: StudentChannel;

  constructor(private dbClient: DbClient) {
    this.studentChannel = new StudentChannel();
  }

  public add(student: Student): Observable<number> {
    student.sections = undefined;
    student.classCharacter = student.classCharacter.toUpperCase();
    return this.dbClient.do<number>(this.studentChannel.channelInsert, student);
  }

  public get(studentId: number): Observable<Student> {
    return this.dbClient.do<Student>(this.studentChannel.channelFindOne, studentId);
  }

  public update(student: Student): Observable<number> {
    student.sections = undefined;
    return this.dbClient.do<number>(this.studentChannel.channelUpdate, student);
  }

  public delete(studentId: number): Observable<void> {
    return this.dbClient.do<void>(this.studentChannel.channelDelete, studentId);
  }

  public getAll(): Observable<Student[]> {
    return this.dbClient.do<Student[]>(this.studentChannel.channelGetAll);
  }

  public addSectionsToStudent(studentId: number, sectionIds: number[]): Observable<number[]> {
    const arg: StudentSectionsDTO = {
      studentId: studentId,
      sectionIds: sectionIds
    };
    return this.dbClient.do<number[]>(this.studentChannel.channelAddSections, arg);
  }

  public deleteSectionsFromStudent(studentId: number, sectionIds: number[]): Observable<number> {
    const arg: StudentSectionsDTO = {
      studentId: studentId,
      sectionIds: sectionIds
    };
    return this.dbClient.do<number>(this.studentChannel.channelDeleteSections, arg);
  }
}
