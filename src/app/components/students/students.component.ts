import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {Student} from '../../../../commons/domain/student';
import {StudentService} from '../../client/student.service';
import {SectionService} from '../../client/section.service';
import {Section} from '../../../../commons/domain/section';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('filter') filter: ElementRef;

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

  onAddedStudent(student: Student) {
    let newData = this.dataSource.data;
    newData.unshift(student);
    this.dataSource.data = newData;
  }

}
