import {Component, NgZone, OnInit, ViewChild} from '@angular/core';
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
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {Section} from '../../../../commons/domain/section';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  dataSource: MatTableDataSource<Student>;
  displayedColumns: string[] = [
    'position',
    'firstName',
    'lastName',
    'classNumber',
    'classCharacter',
    'sections'
  ];

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
        this.dataSource.paginator = this.paginator;
      });
  }

  joinSections(sections: Section[]): string {
    if (!sections) return "";
    return sections.map(section => section.name).join(', ');
  }
}
