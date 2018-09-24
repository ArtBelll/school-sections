import {Component, OnInit} from '@angular/core';
import {StudentService} from '../../client/student.service';
import {Student} from '../../../../commons/domain/student';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private studentService: StudentService) {
  }

  ngOnInit() {
  }

  testInsert() {
    console.log('Insert');
    this.studentService.add(new Student('Tester', 'Testerov', 1, 'A'))
      .subscribe(() => {
      });
  }
}
