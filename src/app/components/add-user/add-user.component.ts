import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  showAddUserForm() {
    let dialogRef = this.dialog.open(AddUserComponentDialog, {
      height: '400px',
      width: '600px',
    });
  }
}

@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-user-dialog.html',
})
export class AddUserComponentDialog {

  constructor(
    public dialogRef: MatDialogRef<AddUserComponentDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
