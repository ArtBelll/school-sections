import {Component, Input, OnInit} from '@angular/core';
import {Section, SectionInfo} from "../../../../commons/domain/section";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {SectionDialogComponent} from "../../dialogs/section-dialog/section-dialog.component";
import {isUndefined} from "util";
import {SectionService} from "../../client/section.service";

@Component({
  selector: 'app-section-actions',
  templateUrl: './section-actions.component.html',
  styleUrls: ['./section-actions.component.css']
})
export class SectionActionsComponent implements OnInit {

  @Input() section: Section;

  constructor(private dialog: MatDialog,
              private sectionService: SectionService) {

  }

  ngOnInit() {
  }

  showEditForm() {
    const sectionInfo: SectionInfo = {
      name: this.section.name,
      isSport: this.section.isSport
    };
    let dialogRef = this.dialog.open(SectionDialogComponent, {
      width: '300px',
      position: {
        top: '100px'
      },
      data: {section: new Section(sectionInfo), edit: true}
    });

    dialogRef.afterClosed()
      .filter(section => !isUndefined(section))
      .mergeMap(section => {
        section.id = this.section.id;
        return this.sectionService.update(section);
      })
      .mergeMap(id => this.sectionService.get(id))
      .subscribe(section => this.refreshSection(section));
  }

  private refreshSection(section: Section) {
    this.section.name = section.name;
    this.section.isSport = section.isSport
  }

}
