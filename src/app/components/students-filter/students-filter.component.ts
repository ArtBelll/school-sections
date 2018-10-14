import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Student} from '../../../../commons/domain/student';
import {FilterManager} from '../../filter-manager';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {map, startWith} from 'rxjs/operators';
import {SectionService} from '../../client/section.service';

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
  isSport: boolean;
  section = new FormControl();

  sectionOptions: string[];
  filteredOptions: Observable<string[]>;

  constructor(private sectionService: SectionService) {
  }

  ngOnInit() {
    this.sectionService.getAll()
      .subscribe(sections => {
        this.sectionOptions = sections.map(s => s.name)

        this.filteredOptions = this.section.valueChanges
          .pipe(
            startWith(''),
            map(val => this.filterSection(val))
          );
      });
  }

  filter() {
    const filterManager = new FilterManager({
      classFrom: this.classFrom,
      classTo: this.classTo,
      classCharacter: this.classCharacter ? this.classCharacter.toUpperCase() : undefined,
      isSport: this.isSport,
      section: this.section.value
    });
    this.filtered.emit(filterManager.resolvePredicates());
  }

  filterSection(val: string): string[] {
    return this.sectionOptions.filter(option =>
      option.toLowerCase().indexOf(val.toLowerCase()) === 0);
  }

  clearFilters() {
    this.classFrom = null;
    this.classTo = null;
    this.classCharacter = null;
    this.isSport = false;
    this.section.setValue('');

    this.filter();
  }
}
