import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatCheckboxChange, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-delete-section-dialog',
  templateUrl: './delete-section-dialog.component.html'
})
export class DeleteSectionDialogComponent {

  deletedSection: number[] = [];

  constructor(
    public dialogRef: MatDialogRef<DeleteSectionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addToDeleted(event: MatCheckboxChange, id: number) {
    if (event.checked) {
      this.deletedSection.push(id);
    } else {
      const index = this.deletedSection.indexOf(id);
      this.deletedSection.splice(index, 1);
    }
    console.log(this.deletedSection);
  }
}
