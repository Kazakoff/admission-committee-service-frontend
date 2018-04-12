import {Certificates} from './certificates';
import {Privillege} from './privillege';

export class CompetitionInfo {
  constructor() {
    this.documents = [];
  }
  documents: Certificates[];
  privilleges: Privillege[];
}
