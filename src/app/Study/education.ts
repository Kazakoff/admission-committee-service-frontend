import {EducationLevel} from './educationLevel';
import {Language} from './language';
import {EducationInstitution} from './educationInstitution';

export class Education {

  educationInstitutionId: EducationInstitution;
  endYear: number;
  educationLevelId: EducationLevel;
  languageId: Language;
  goldMedalist: boolean;
  honours: boolean;

}
