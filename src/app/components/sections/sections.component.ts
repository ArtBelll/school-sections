import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {SectionService} from '../../client/section.service';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {Section} from '../../../../commons/domain/section';

@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.css']
})
export class SectionsComponent implements OnInit {

  @ViewChild('filter') filter: ElementRef;

  dataSource: MatTableDataSource<Section>;
  displayedColumns: string[] = [
    'position',
    'name',
    'isSport',
    'actions'
  ];

  constructor(private sectionService: SectionService) {
  }

  ngOnInit() {
    this.sectionService.getAll()
      .subscribe(sections => {
        this.dataSource = new MatTableDataSource<Section>(sections);
      });
  }

  onAddedSection(section: Section) {
    let newData = this.dataSource.data;
    newData.unshift(section);
    this.dataSource.data = newData;
  }
}
