import {Certificates} from './certificates';
import {Privillege} from './privillege';

export class CompetitionInfo {
  constructor() {
    this.documents = [];
    this.privilleges = [];
  }
  documents: Certificates[];
  privilleges: Privillege[];
}
