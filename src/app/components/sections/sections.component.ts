import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {SectionService} from '../../client/section.service';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {Section} from '../../../../commons/domain/section';
import {SectionObservable} from "../../observable/SectionObservable";

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

  constructor(private sectionService: SectionService,
              private sectionObservable:SectionObservable) {
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

  onDeletedSection(sectionId: number) {
    let newData = this.dataSource.data;
    const index = newData.findIndex(section => section.id == sectionId);
    newData.splice(index, 1);
    this.dataSource.data = newData;
    this.sectionObservable.deleteSectionEmit();

  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

}
