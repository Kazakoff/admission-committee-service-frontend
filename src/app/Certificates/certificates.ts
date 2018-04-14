import {Eddoctype} from './eddoctype';
import {Subject} from './subject';

export class Certificates {
  documentId: number;
  subjectId: Subject;
  educationDocumentTypeId: Eddoctype;
  seria: string;
  number: number;
  nameUO: string;
  marks: number[];
}
