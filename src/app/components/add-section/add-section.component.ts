import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatDialog} from '@angular/material';
import {SectionService} from '../../client/section.service';
import {Section} from '../../../../commons/domain/section';
import {isUndefined} from 'util';
import {SectionDialogComponent} from '../../dialogs/section-dialog/section-dialog.component';

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
    this.dialog.open(SectionDialogComponent, {
      width: '300px',
      position: {
        top: '100px'
      },
      data: {section: this.section}
    }).afterClosed()
      .filter(section => this.validate(section))
      .mergeMap(section => this.sectionService.add(section))
      .mergeMap(sectionId => this.sectionService.get(sectionId))
      .subscribe(section => {
        this.added.emit(section);
        this.section = new Section(
          {
            name: '',
            isSport: false
          }
        );
      });
  }

  validate(section: Section): boolean {
    return !isUndefined(section) && !isUndefined(section.name);
  }
}

