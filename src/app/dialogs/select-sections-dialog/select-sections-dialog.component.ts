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

  public sectionCtrl = new FormControl();
  public sectionFilterCtrl = new FormControl();

  public filteredSections = new ReplaySubject<Section[]>();

  constructor(
    public dialogRef: MatDialogRef<SelectSectionsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    this.filteredSections.next(this.data.sections.slice());

    this.sectionFilterCtrl.valueChanges
      .subscribe(() => {
        this.filterBanksMulti();
      });
  }

  private filterBanksMulti() {
    if (!this.data.sections) {
      return;
    }

    let search = this.sectionFilterCtrl.value;
    if (!search) {
      this.filteredSections.next(this.data.sections.slice());
      return;
    } else {
      search = search.toLowerCase();
    }

    this.filteredSections.next(
      this.data.sections.filter(section => section.name.toLowerCase().indexOf(search) > -1)
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
