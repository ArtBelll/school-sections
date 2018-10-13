import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Student} from '../../../../commons/domain/student';
import {FilterManager} from '../../filter-manager';

@Component({
  selector: 'app-students-filter',
  templateUrl: './students-filter.component.html',
  styleUrls: ['./students-filter.component.css']
})
export class StudentsFilterComponent implements OnInit {

  @Output() filtered = new EventEmitter<(students: Student) => boolean>();

  classFrom: number;
  classTo: number;
  classCharacter: string;

  constructor() {

  }

  ngOnInit() {
  }

  filter() {
    const filterManager = new FilterManager({
      classFrom: this.classFrom,
      classTo: this.classTo,
      classCharacter: this.classCharacter.toUpperCase()
    });
    this.filtered.emit(filterManager.resolvePredicates());
  }

}
