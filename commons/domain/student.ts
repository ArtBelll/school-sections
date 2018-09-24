import {Section} from './section';

export class Student {
  id: number;
  firstName: string;
  lastName: string;
  classNumber: number;
  classCharacter: string;
  sections: Section[];

  constructor(firstName: string, lastName: string,
              classNumber: number, classCharacter: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.classNumber = classNumber;
    this.classCharacter = classCharacter;
  }
}
