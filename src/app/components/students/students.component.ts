import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {Student} from '../../../../commons/domain/student';
import {StudentService} from '../../client/student.service';
import {SectionService} from '../../client/section.service';
import {Section} from '../../../../commons/domain/section';
import {SectionObservable} from "../../observable/SectionObservable";

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('filter') filter: ElementRef;

  studentsSource: Student[];

  dataSource: MatTableDataSource<Student>;
  displayedColumns: string[] = [
    'position',
    'firstName',
    'lastName',
    'classNumber',
    'classCharacter',
    'sections',
    'actions'
  ];

  constructor(private studentService: StudentService,
              private sectionService: SectionService,
              private sectionObservable: SectionObservable) {}

  ngOnInit(): void {
    this.initTable();
    this.sectionObservable.deleteSectionEmitted.subscribe(bool => {
        this.initTable();
    })
  }

  joinSections(sections: Section[]): string {
    if (!sections) return "";
    return sections.map(section => section.name).join(', ');
  }

  onAddedStudent(student: Student) {
    let newData = this.dataSource.data;
    newData.unshift(student);
    this.dataSource.data = newData;
    this.studentsSource.unshift(student);
  }

  onDeletedStudent(studentId: number) {
    let newData = this.dataSource.data;
    const indexDS = newData.findIndex(student => student.id == studentId);
    const indexSS = this.studentsSource.findIndex(student => student.id == studentId);
    newData.splice(indexDS, 1);
    this.dataSource.data = newData;
    this.studentsSource.splice(indexSS, 1);
  }

  deleteStudents() {
    this.studentsSource.forEach((item) => {
      if (item.sections.length === 0 ) {
        this.studentService.delete(item.id).subscribe(() => {
          this.onDeletedStudent(item.id);
        });
      }
    })
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  initTable() {
    this.studentService.getAll()
      .subscribe(students => {
        students
          .forEach(student => this.sectionService.getSectionsByStudent(student.id)
            .subscribe(sections => {
              student.sections = sections;
            }));
        this.studentsSource = students;
        this.dataSource = new MatTableDataSource<Student>(students);
        this.dataSource.paginator = this.paginator;
      });
  }

  onFiltered(predicate: (students: Student) => boolean) {
    this.dataSource.data = this.studentsSource.filter(predicate);
  }
}
