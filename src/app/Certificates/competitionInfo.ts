import {Certificates} from './certificates';

export class CompetitionInfo {
  constructor() {
    this.documents = [];
    this.specialities = [];
  }
  documents: Certificates[];
  specialities: number[];
}
