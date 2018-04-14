import {Eddoctype} from './eddoctype';
import {Subject} from './subject';

export class Certificates {
  constructor() {
    this.subjectId = {id: 1, name: ' '};
    this.educationDocumentTypeId = {id: 1, name: ''};
}
  documentId: number;
  subjectId: Subject;
  educationDocumentTypeId: Eddoctype;
  seria: string;
  number: number;
  nameUO: string;
  marks: number[];
}
