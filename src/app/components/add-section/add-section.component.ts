import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {Student} from '../../../../commons/domain/student';
import {StudentService} from '../../client/student.service';
import {SectionService} from '../../client/section.service';
import {Section} from '../../../../commons/domain/section';
import {AddUserComponentDialog} from '../add-student/add-user.component';
import {isUndefined} from "util";

@Component({
  selector: 'app-add-section',
  templateUrl: './add-section.component.html',
  styleUrls: ['./add-section.component.css']
})
export class AddSectionComponent implements OnInit {

  @Output() added = new EventEmitter<Section>();

  section = new Section();

  constructor(private sectionService: SectionService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
  }

  showAddSectionForm() {
    let dialogRef = this.dialog.open(AddSectionComponentDialog, {
      width: '300px',
      position: {
        top: '100px'
      },
      data: {section: this.section}
    });

    dialogRef.afterClosed().subscribe(section => {
      if (this.validate(section)) {
        this.sectionService.add(section)
          .flatMap(sectionId => this.sectionService.get(sectionId))
          .subscribe(section => {
            this.added.emit(section);
          });
      }
      this.section = new Section();
    });
  }

  validate(section: Section): boolean {
    return !isUndefined(section) && !isUndefined(section.name);
  }
}

@Component({
  selector: 'app-add-section-dialog',
  templateUrl: '../../dialogs/add-section-dialog.html',
})
export class AddSectionComponentDialog {

  constructor(
    public dialogRef: MatDialogRef<AddSectionComponentDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
