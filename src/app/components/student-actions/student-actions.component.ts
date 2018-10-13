import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {StudentService} from '../../client/student.service';
import {SectionService} from '../../client/section.service';
import {MatDialog} from '@angular/material';
import {Student, StudentInfo} from '../../../../commons/domain/student';
import {isUndefined} from 'util';
import 'rxjs/add/operator/filter';
import {StudentDialogComponent} from '../../dialogs/student-dialog/student-dialog.component';
import {SelectSectionsDialogComponent} from '../../dialogs/select-sections-dialog/select-sections-dialog.component';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import {DeleteSectionDialogComponent} from '../../dialogs/delete-section-dialog/delete-section-dialog.component';

@Component({
  selector: 'app-student-actions',
  templateUrl: './student-actions.component.html',
  styleUrls: ['./student-actions.component.css']
})
export class StudentActionsComponent implements OnInit {

  @Input() student: Student;

  @Output() deleted = new EventEmitter<number>();

  constructor(private studentService: StudentService,
              private sectionService: SectionService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
  }

  showSelectSectionsForm() {
    this.sectionService.getAll()
      .mergeMap(sections => this.dialog.open(SelectSectionsDialogComponent, {
        width: '300px',
        position: {
          top: '100px'
        },
        data: {
          sections: sections,
          student: this.student
        }
      }).afterClosed())
      .filter(sections => sections)
      .mergeMap(sections => this.studentService
        .addSectionsToStudent(this.student.id, sections.map(section => section.id))
      )
      .mergeMap(sectionIds => {
        const sectionsObs = sectionIds.map(sectionId => this.sectionService.get(sectionId));
        return Observable.forkJoin(sectionsObs);
      })
      .subscribe(sections => {
        if (!this.student.sections) {
          this.student.sections = [];
        }
        Array.prototype.push.apply(this.student.sections, sections);
      });
  }

  showDeleteSectionsForm() {
   this.dialog.open(DeleteSectionDialogComponent, {
      width: '300px',
      position: {
        top: '100px'
      },
      data: {student: this.student}
    }).afterClosed()
      .filter(sectionIds => sectionIds)
      .mergeMap(sectionIds => this.studentService
        .deleteSectionsFromStudent(this.student.id, sectionIds))
      .mergeMap(studentId => this.sectionService.getSectionsByStudent(studentId))
      .subscribe(sections => this.student.sections = sections);
  }

  showEditForm() {
    const studentInfo: StudentInfo = {
      firstName: this.student.firstName,
      lastName: this.student.lastName,
      classNumber: this.student.classNumber,
      classCharacter: this.student.classCharacter
    };
    let dialogRef = this.dialog.open(StudentDialogComponent, {
      width: '300px',
      position: {
        top: '100px'
      },
      data: {student: new Student(studentInfo), edit: true}
    });

    dialogRef.afterClosed()
      .filter(student => !isUndefined(student))
      .mergeMap(student => {
        student.id = this.student.id;
        return this.studentService.update(student);
      })
      .mergeMap(id => this.studentService.get(id))
      .subscribe(student => this.refreshStudent(student));
  }

  delete(studentId: number) {
    this.studentService.delete(studentId).subscribe(() => {
      this.deleted.emit(studentId);
    });
  }

  private refreshStudent(student: Student) {
    this.student.firstName = student.firstName;
    this.student.lastName = student.lastName;
    this.student.classNumber = student.classNumber;
    this.student.classCharacter = student.classCharacter;
  }
}
