import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {Student} from '../../../../commons/domain/student';
import {StudentService} from '../../client/student.service';
import {SectionService} from '../../client/section.service';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  @Output() added = new EventEmitter<Student>();

  student = new Student();

  constructor(private studentService: StudentService,
              private sectionService: SectionService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
  }

  showAddUserForm() {
    let dialogRef = this.dialog.open(AddUserComponentDialog, {
      width: '300px',
      position: {
        top: '100px'
      },
      data: {student: this.student}
    });

    dialogRef.afterClosed().subscribe(student => {
      this.studentService.add(student)
        .flatMap(studentId => this.studentService.get(studentId))
        .subscribe(result => {
          console.log(result);
          this.added.emit(result);
        });
      this.student = new Student();
    });
  }
}

@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-user-dialog.html',
})
export class AddUserComponentDialog {

  constructor(
    public dialogRef: MatDialogRef<AddUserComponentDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
