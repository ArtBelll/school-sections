import {Component, OnInit} from '@angular/core';
import {SectionService} from './client/section.service';
import {Section} from '../../database/domain/section';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private sectionService: SectionService) {
  }

  testInsert(): void {
    console.log("Insert");
    this.sectionService.add(new Section("Hello", false));
  }

  testGetAllSections() {
    console.log("Select");
    this.sectionService.getAll().subscribe((sections: Section[]) => {
      console.log(sections);
    });
  }

}
