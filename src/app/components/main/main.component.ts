import {Component, NgZone, OnInit} from '@angular/core';
import {StudentService} from '../../client/student.service';
import {Student} from '../../../../commons/domain/student';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/scan';
import {SectionService} from '../../client/section.service';
import 'rxjs/add/operator/concat';
import 'rxjs/add/operator/concatAll';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  students: Observable<Student[]>;

  constructor(private studentService: StudentService, private sectionService: SectionService) {
  }

  ngOnInit(): void {
    this.students = this.studentService.getAll()
      .map(students => {
        students
          .map(student => this.sectionService.getSectionsByStudent(student.id)
          .subscribe(sections => {
            student.sections = sections;
          }));
        return students;
      });
  }
}
