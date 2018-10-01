import {Section} from './section';

export interface StudentInfo {
  firstName: string;
  lastName: string;
  classNumber: number;
  classCharacter: string;
}

export class Student {
  id: number;
  firstName: string;
  lastName: string;
  classNumber: number;
  classCharacter: string;
  sections: Section[];

  constructor(studentInfo?: StudentInfo) {
    if (!studentInfo) {
      return;
    }
    this.firstName = studentInfo.firstName;
    this.lastName = studentInfo.lastName;
    this.classNumber = studentInfo.classNumber;
    this.classCharacter = studentInfo.classCharacter;
  }
}
