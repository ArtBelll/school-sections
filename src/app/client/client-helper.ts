import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import {StudentService} from './student.service';
import {SectionService} from './section.service';
import {Student} from '../../../commons/domain/student';

@Injectable()
export class ClientHelper {

  constructor(private studentService: StudentService,
              private sectionService: SectionService) {
  }

  public addStudentWithSections(student: Student): Observable<Student> {
    const sectionIds = student.sections ? student.sections.map(section => section.id) : undefined;
    return this.studentService.add(student)
      .mergeMap(studentId => {
        const studentObs = this.studentService.get(studentId);
        const sectionsObs = sectionIds ?
          this.studentService.addSectionsToStudent(studentId, sectionIds)
            .mergeMap(sectionIds =>
              Observable.forkJoin(sectionIds.map(sectionId => this.sectionService.get(sectionId))))
          : Observable.of([]);
        return Observable.forkJoin(studentObs, sectionsObs);
      })
      .map(result => {
        result[0].sections = result[1];
        return result[0];
      });
  }
}
