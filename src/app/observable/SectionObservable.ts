import {Injectable} from "@angular/core";
import {Subject} from "rxjs/Rx";

@Injectable()

export class SectionObservable
{
  private deleteSection = new Subject();
  deleteSectionEmitted = this.deleteSection.asObservable();
  deleteSectionEmit() {
    this.deleteSection.next();
  }
}
