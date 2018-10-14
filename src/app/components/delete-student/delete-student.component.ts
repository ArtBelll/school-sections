import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-delete-student',
  templateUrl: './delete-student.component.html',
  styleUrls: ['./delete-student.component.css']
})
export class DeleteStudentComponent implements OnInit {

  @Output() deleted = new EventEmitter<number>();
  constructor() { }

  ngOnInit() {
  }
  delete(){
    this.deleted.emit();
  }

}
