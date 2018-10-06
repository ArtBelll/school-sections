import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Section} from '../../../../commons/domain/section';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {MAT_DIALOG_DATA, MatDialogRef, MatSelect} from '@angular/material';

@Component({
  selector: 'app-select-sections-dialog',
  templateUrl: './select-sections-dialog.component.html'
})
export class SelectSectionsDialogComponent implements OnInit {

  sectionCtrl = new FormControl();
  sectionFilterCtrl = new FormControl();

  filteredSections = new ReplaySubject<Section[]>();

  sections: Section[];

  constructor(
    public dialogRef: MatDialogRef<SelectSectionsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    if (this.data.student.sections) {
      this.sections = this.data.sections
        .filter(section => this.data.student.sections
          .findIndex(s => s.id == section.id) == -1);
    } else {
      this.sections = this.data.sections;
    }

    this.filteredSections.next(this.sections);

    this.sectionFilterCtrl.valueChanges
      .subscribe(() => {
        this.filterBanksMulti();
      });
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

  onNoClick(): void {
    this.dialogRef.close();
  }

}
