import {Component, Inject, Input, OnInit} from '@angular/core';
import {StudentService} from '../../client/student.service';
import {SectionService} from '../../client/section.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {Student, StudentInfo} from '../../../../commons/domain/student';
import {isUndefined} from 'util';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-student-actions',
  templateUrl: './student-actions.component.html',
  styleUrls: ['./student-actions.component.css']
})
export class StudentActionsComponent implements OnInit {

  @Input() student: Student;

  constructor(private studentService: StudentService,
              private sectionService: SectionService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
  }

  showSelectSectionsForm() {
    let dialogRef = this.dialog.open(SelectSectionsComponentDialog, {
      width: '300px',
      position: {
        top: '100px'
      },
      // data: {section: this.student}
    });

    dialogRef.afterClosed().subscribe(sections => {

    });
  }

  showEditForm() {
    const studentInfo: StudentInfo = {
      firstName: this.student.firstName,
      lastName: this.student.lastName,
      classNumber: this.student.classNumber,
      classCharacter: this.student.classCharacter
    };
    let dialogRef = this.dialog.open(EditStudentComponentDialog, {
      width: '300px',
      position: {
        top: '100px'
      },
      data: {student: new Student(studentInfo)}
    });

    dialogRef.afterClosed()
      .filter(student => !isUndefined(student))
      .mergeMap(student => {
        student.id = this.student.id;
        return this.studentService.update(student)
      })
      .mergeMap(id => this.studentService.get(id))
      .subscribe(student => this.refreshStudent(student));
  }

  delete() {

  }

  private refreshStudent(student: Student) {
    this.student.firstName = student.firstName;
    this.student.lastName = student.lastName;
    this.student.classNumber = student.classNumber;
    this.student.classCharacter = student.classCharacter;
  }
}

@Component({
  selector: 'app-select-sections-dialog',
  templateUrl: '../../dialogs/select-sections-dialog.html',
})
export class SelectSectionsComponentDialog {

  constructor(
    public dialogRef: MatDialogRef<SelectSectionsComponentDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

@Component({
  selector: 'app-edit-student-dialog',
  templateUrl: '../../dialogs/edit-student-dialog.html',
})
export class EditStudentComponentDialog {

  constructor(
    public dialogRef: MatDialogRef<EditStudentComponentDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

