import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatDialog} from '@angular/material';
import {Student} from '../../../../commons/domain/student';
import {StudentService} from '../../client/student.service';
import {isUndefined} from 'util';
import {StudentDialogComponent} from '../../dialogs/student-dialog/student-dialog.component';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {

  @Output() added = new EventEmitter<Student>();

  student = new Student();

  constructor(private studentService: StudentService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
  }

  showAddUserForm() {
    let dialogRef = this.dialog.open(StudentDialogComponent, {
      width: '300px',
      position: {
        top: '100px'
      },
      data: {student: this.student}
    });

    dialogRef.afterClosed().subscribe(student => {
      if (this.validate(student)) {
        this.studentService.add(student)
          .flatMap(studentId => this.studentService.get(studentId))
          .subscribe(result => {
            this.added.emit(result);
          });
      }
      this.student = new Student();
    });
  }

  private validate(student: Student): boolean {
    return !isUndefined(student) && !isUndefined(student.firstName)
      && !isUndefined(student.lastName) && !isUndefined(student.classNumber)
      && !isUndefined(student.classCharacter);
  }
}
