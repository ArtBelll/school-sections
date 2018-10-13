import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Section} from '../../../../commons/domain/section';
import {Student} from '../../../../commons/domain/student';

@Component({
  selector: 'app-student-dialog',
  templateUrl: './student-dialog.component.html'
})
export class StudentDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<StudentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {student: Student, sections: Section[], edit: boolean}) {
  }

  onSelected(sections: Section[]) {
    this.data.student.sections = sections;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
