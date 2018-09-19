export class Section {

  id: number;
  name: string;
  isSport: boolean;

  constructor(name: string, isSport) {
    this.name = name;
    this.isSport = isSport;
  }
}
