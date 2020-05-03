import { Doctype } from "./doctype";
import { Nationality } from "./nationality";

export class Personal {
  documentTypeId: Doctype;
  documentSeria: string;
  documentNumber: string;
  documentDate: string;
  documentOrgan: string;
  firstName: string;
  lastName: string;
  // !!! add field
  firstName_en: string;
  lastName_en: string;
  middleName: string;
  birthDate: string;
  birthPlace: string;
  nationalityId: Nationality;
  identificationNumber: string;
  sex = 1;
}
