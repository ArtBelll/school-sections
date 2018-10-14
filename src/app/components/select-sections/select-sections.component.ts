import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {Section} from '../../../../commons/domain/section';
import {Student} from '../../../../commons/domain/student';

@Component({
  selector: 'app-select-sections',
  templateUrl: './select-sections.component.html',
  styleUrls: ['./select-sections.component.css']
})
export class SelectSectionsComponent implements OnInit {

  @Input() student: Student;
  @Input() sectionsSource: Section[];

  @Output() selected = new EventEmitter<Section[]>();

  sectionCtrl = new FormControl();
  sectionFilterCtrl = new FormControl();

  filteredSections = new ReplaySubject<Section[]>();

  sections: Section[];

  constructor() { }

  ngOnInit() {
    if (this.student.sections) {
      this.sections = this.sectionsSource
        .filter(section => this.student.sections
          .findIndex(s => s.id == section.id) == -1);
    } else {
      this.sections = this.sectionsSource;
    }

    this.filteredSections.next(this.sections);

    this.sectionFilterCtrl.valueChanges
      .subscribe(() => {
        this.filterBanksMulti();
      });

    this.sectionCtrl.valueChanges
      .subscribe(sections => this.selected.emit(sections));
  }

  private filterBanksMulti() {
    if (!this.sections) {
      return;
    }

    let search = this.sectionFilterCtrl.value;
    if (!search) {
      this.filteredSections.next(this.sections.slice());
      return;
    } else {
      search = search.toLowerCase();
    }

    this.filteredSections.next(
      this.sections.filter(section => section.name.toLowerCase().indexOf(search) > -1)
    );
  }
}
