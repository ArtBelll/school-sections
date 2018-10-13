import {Component, Inject} from '@angular/core';
import {Section} from '../../../../commons/domain/section';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-select-sections-dialog',
  templateUrl: './select-sections-dialog.component.html'
})
export class SelectSectionsDialogComponent {

  sectionsCtrl: Section[] = [];

  constructor(
    public dialogRef: MatDialogRef<SelectSectionsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  noSelected(sections: Section[]) {
    this.sectionsCtrl = sections;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
