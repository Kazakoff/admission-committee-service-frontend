import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Education} from './education';
import {EducationLevel} from './educationLevel';
import {Language} from './language';
import {HttpService} from './study.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { NotifierService } from 'angular-notifier';
import {EdType} from './edType';
import {EstCity} from './estCity';
import {NewEducationInstitution} from './newEducationInstitution';

@Component({
  selector: 'study',
  templateUrl: './study.component.html',
  styles: [`
    input.ng-touched.ng-invalid {
      border: solid red 2px;
    }

    input.ng-touched.ng-valid {
      border: solid green 2px;
    }
  `],
  providers: [HttpService]
})
export class StudyComponent implements OnInit {

  token = JSON.parse(localStorage.getItem('token'));
  education: Education = new Education();
  educationObject: Education[] = [];
  done = false;
  receivedEducation: Education;
  educationEdited: Education;
  error: any;
  educationLevel: EducationLevel[] = [{
    id: 1, name: ''
  }];
  language: Language[] = [{
    id: 1, name: ''
  }];
  edTypes: EdType[] = [{id: 1, name: ''}];
  estCities: EstCity[] = [{id: 1, name: ''}];
  educationInstitutions: any[] = [{id: 1, name: ''}];
  page = 0;
  newEducationInstitution: NewEducationInstitution = new NewEducationInstitution();
  errorInstitution: any;
  tokenInvalid: boolean;
  isAbiturientLoading: boolean;
  isEdLevelLoading: boolean;
  isLanguageLoading: boolean;
  isSubmitLoading: boolean;
  isEdTypeLoading: boolean;
  isEstCityLoading: boolean;

  @ViewChild('addEducationalInstitution')
  addEducationalInstitution: ElementRef;

  @ViewChild('educationalInstituteType')
  educationalInstituteType: ElementRef;

  @ViewChild('estCity')
  estCity: ElementRef;

  @ViewChild('estName')
  estName: ElementRef;

  @ViewChild('addEdInstButton')
  addEdInstButton: ElementRef;

  constructor(private httpService: HttpService, private httpClient: HttpClient, private _service: NotifierService) {
  }

  successEvent() {
    this._service.notify('success', 'Форма отправлена успешно');
  }

  errorEvent() {
    this._service.notify('error', 'Неожиданная ошибка...');
  }

  addHeaders() {
    const myHeaders = new HttpHeaders()
      .set('Authorization', 'Bearer ' + this.token)
      .set('Content-Type', 'application/json');
    return myHeaders;
  }

  onInputChange(value) {
    this.httpService.getEducationInstituteFragment(value).subscribe((response) => {
      this.educationInstitutions = response['content'];
    });
  }

  submit(education: Education) {
    this.isSubmitLoading = true;
    this.httpService.postData(education)
      .subscribe(
        (data: Education) => {
          this.receivedEducation = data;
          this.done = true;
          this.error = undefined;
          this.successEvent();
          this.isSubmitLoading = false;
        },
        error => {
          this.error = error; this.errorEvent();
          this.isSubmitLoading = false;
        }
      );

  }

  showAddEducationInstitution() {
    if (this.addEducationalInstitution.nativeElement.hidden === true) {
      this.addEducationalInstitution.nativeElement.hidden = false;
      this.addEdInstButton.nativeElement.innerHTML = 'Скрыть добавление учреждения образования';
    } else {
      this.addEdInstButton.nativeElement.innerHTML = 'Добавить учреждение образования';
      this.addEducationalInstitution.nativeElement.hidden = true;
    }
  }

  saveNewEducationInstitution(newEducationInstitution: NewEducationInstitution) {
    this.education.educationInstitutionId = {};
    this.httpService.saveNewEducationInstitute(newEducationInstitution).subscribe((inst) => {
      this.educationInstitutions = [];
      this.educationInstitutions.push(inst);
      this.education.educationInstitutionId = this.educationInstitutions[0];
    }, error => { this.errorInstitution = error; console.log(this.errorInstitution); });
    this.addEducationalInstitution.nativeElement.hidden = true;
    this.addEdInstButton.nativeElement.innerHTML = 'Добавить учреждение образования';
  }

  loadAbiturient() {
    this.isAbiturientLoading = true;
    this.httpService.getAbitur().subscribe(data => {
      this.httpService.userid = data['id'];
      this.tokenInvalid = false;
      this.educationObject = data['educationInfo'];
      if (this.educationObject == null) {
        console.log('Set inputs');
      } else {
        this.education.educationInstitutionId = this.educationObject['educationInstitution'];
        this.educationInstitutions.push(this.education.educationInstitutionId);
        this.education.endYear = this.educationObject['endYear'];
        this.education.educationLevelId = this.educationObject['educationLevel'];
        this.education.languageId = this.educationObject['language'];
        this.education.goldMedalist = this.educationObject['goldMedalist'];
        this.education.honours = this.educationObject['honours'];
      }
      this.isAbiturientLoading = false;
    }, (error) => {
      if (error.status === 401) {
        this.tokenInvalid = true;
        this.isAbiturientLoading = false;
      }
    });
  }

  loadLanguage() {
    this.isLanguageLoading = true;
    this.httpService.getLanguage().subscribe(data => {
      this.language = data['content'];
      this.isLanguageLoading = false;
    }, () => this.isLanguageLoading = false);
  }

  loadEdLevel() {
    this.isEdLevelLoading = true;
    this.httpService.getEdLevel().subscribe(data => {
      this.educationLevel = data['content'];
      this.isEdLevelLoading = false;
    }, () => this.isEdLevelLoading = false);
  }

  loadEdType() {
    this.isEdTypeLoading = true;
    this.httpService.getEdType().subscribe(data => {
      this.edTypes = data['content'];
      this.isEdTypeLoading = false;
    }, () => this.isEdTypeLoading = false);
  }

  loadEstCity() {
    this.isEstCityLoading = true;
    this.httpService.getEstCity().subscribe(data => {
      this.estCities = data['content'];
      this.isEstCityLoading = false;
    }, () => this.isEstCityLoading = false);
  }

  ngOnInit() {
    this.education.goldMedalist = false;
    this.education.honours = false;
    this.isAbiturientLoading = false;
    this.isLanguageLoading = false;
    this.isEdLevelLoading = false;
    this.isEdTypeLoading = false;
    this.isEstCityLoading = false;
    this.isSubmitLoading = false;
    this.addEducationalInstitution.nativeElement.hidden = true;
    this.education.educationLevelId = this.educationLevel[0];
    this.education.educationInstitutionId = this.educationInstitutions[0];
    this.education.languageId = this.language[0];
    this.newEducationInstitution.typeId = this.edTypes[0];
    this.newEducationInstitution.estCityId = this.estCities[0];

   this.loadAbiturient();
   this.loadLanguage();
   this.loadEdLevel();
   this.loadEdType();
   this.loadEstCity();
  }

}
