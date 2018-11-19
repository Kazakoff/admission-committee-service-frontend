import {Eddoctype} from './eddoctype';
import {Subject} from './subject';

export class Certificates {
  constructor() {
    this.subjectId = 1;
    this.educationDocumentTypeId = 1;
}
  documentId: number;
  subjectId: number;
  educationDocumentTypeId: number;
  scale: string;
  seria: string;
  number: number;
  nameUO: string;
  marks: number[];
}
