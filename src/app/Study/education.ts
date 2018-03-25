import {EducationType} from './educationType';
import {EducationLevel} from './educationLevel';
import {EstablishmentCity} from './establishmentCity';
import {Language} from './language';

export class Education {

  uoName: string;
  educationTypeId: EducationType;
  endYear: number;
  educationLevelId: EducationLevel;
  establishmentCityId: EstablishmentCity;
  languageId: Language;
  goldMedalist: boolean;
  honours: boolean;
  notCitizen = false;

}
