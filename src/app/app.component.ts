import {Component, OnInit} from '@angular/core';
import {SectionService} from './dao/section.service';

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
    this.sectionService.testInsert();
  }

}
