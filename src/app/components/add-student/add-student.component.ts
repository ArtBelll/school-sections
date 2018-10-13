import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatDialog} from '@angular/material';
import {Student} from '../../../../commons/domain/student';
import {StudentService} from '../../client/student.service';
import {isUndefined} from 'util';
import {StudentDialogComponent} from '../../dialogs/student-dialog/student-dialog.component';
import {SectionService} from '../../client/section.service';
import {ClientHelper} from '../../client/client-helper';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {

  @Output() added = new EventEmitter<Student>();

  student = new Student();

  constructor(private studentService: StudentService,
              private sectionService: SectionService,
              private clientHelper: ClientHelper,
              private dialog: MatDialog) {
  }

  ngOnInit() {
  }

  showAddUserForm() {
    this.sectionService.getAll()
      .mergeMap(sections => this.dialog.open(StudentDialogComponent, {
        width: '300px',
        position: {
          top: '100px'
        },
        data: {student: this.student, sections: sections}
      }).afterClosed())
      .filter(student => this.validate(student))
      .mergeMap(student => {
        this.student = new Student();
        return this.clientHelper.addStudentWithSections(student);
      })
      .subscribe(student => this.added.emit(student));
  }

  private validate(student: Student): boolean {
    return !isUndefined(student) && !isUndefined(student.firstName)
      && !isUndefined(student.lastName) && !isUndefined(student.classNumber)
      && !isUndefined(student.classCharacter);
  }
}
