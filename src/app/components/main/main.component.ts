import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {StudentService} from '../../client/student.service';
import {Student} from '../../../../commons/domain/student';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/scan';
import {SectionService} from '../../client/section.service';
import 'rxjs/add/operator/concat';
import 'rxjs/add/operator/concatAll';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {Section} from '../../../../commons/domain/section';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  ngOnInit(): void {
  }

}
