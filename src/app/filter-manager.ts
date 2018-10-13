import {Student} from '../../commons/domain/student';

export interface FilterManagerOptions {
  classFrom?: number;
  classTo?: number;
  classCharacter?: string;
}

export class FilterManager {
  classFrom: number;
  classTo: number;
  classCharacter: string;

  constructor(fmo: FilterManagerOptions) {
    this.classFrom = fmo.classFrom;
    this.classTo = fmo.classTo;
    this.classCharacter = fmo.classCharacter;
  }

  resolvePredicates(): (student: Student) => boolean {
    const predicates: Array<(student: Student) => boolean> = [];
    if (this.classFrom) {
        const classTo = this.classTo ? this.classTo : this.classFrom;
        predicates.push(this.getClassPeriodPredicate(this.classFrom, classTo));
    }
    if (this.classCharacter) {
      predicates.push(this.getCharacterPredicate(this.classCharacter))
    }
    return predicates.reduce((p1, p2) => this.and(p1, p2), student => true);
  }

  private and(p1: (student: Student) => boolean, p2: (student: Student) => boolean) {
    return student => p1(student) && p2(student);
  }

  private getClassPeriodPredicate(from: number, to: number): (student: Student) => boolean {
    return student => student.classNumber >= from && student.classNumber <= to;
  }

  private getCharacterPredicate(character: string): (student: Student) => boolean {
    return student => student.classCharacter === character;
  }
}
