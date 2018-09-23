import {Component, OnInit} from '@angular/core';
import {SectionService} from '../../client/section.service';
import {Section} from '../../../../database/domain/section';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor() {
  }
}
