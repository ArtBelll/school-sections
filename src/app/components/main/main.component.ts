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
import 'rxjs/add/observable/of';
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  dataSource: MatTableDataSource<Student>;

  displayedColumns: string[] = ['position', 'firstName', 'lastName', 'classNumber', 'classCharacter'];

  constructor(private studentService: StudentService, private sectionService: SectionService) {
  }

  ngOnInit(): void {
    this.studentService.getAll()
      .subscribe(students => {
        students
          .map(student => this.sectionService.getSectionsByStudent(student.id)
            .subscribe(sections => {
              student.sections = sections;
            }));
        this.dataSource = new MatTableDataSource<Student>(students);
      });
  }
}
