export interface SectionInfo {
  name: string;
  isSport: boolean;
}

export class Section {

  id: number;
  name: string;
  isSport: boolean;

  constructor(sectionInfo?: SectionInfo) {
    if (!sectionInfo) {
      return;
    }
    this.name = sectionInfo.name;
    this.isSport = sectionInfo.isSport;
  }
}
