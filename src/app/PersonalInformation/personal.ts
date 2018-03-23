import {Docseria} from './docseria';
import {Doctype} from './doctype';
import {Nationality} from './nationality';

export class Personal {

  documentTypeId: Doctype;
  documentSeriaId: Docseria;
  documentNumber: string;
  documentDate: Date;
  documentOrgan: string;
  firstName: string;
  lastName: string;
  middleName: string;
  birthDate: Date;
  birthPlace: string;
  nationalityId: Nationality;
  identificationNumber: string;
  sex = 1;

}
