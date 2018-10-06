import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-section-dialog',
  templateUrl: './section-dialog.component.html'
})
export class SectionDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<SectionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
