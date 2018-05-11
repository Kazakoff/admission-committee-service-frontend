import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Education} from './education';
import {EducationLevel} from './educationLevel';
import {Language} from './language';
import {HttpService} from './study.service';
import {EducationInstitution} from './educationInstitution';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {NotificationsService} from 'angular2-notifications';
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

  constructor(private httpService: HttpService, private httpClient: HttpClient, private _service: NotificationsService) {
  }

  successEvent() {
    this._service.success('Form submitted successfully!', 'Click to undo...', {
      timeOut: 4000,
      showProgressBar: true,
      pauseOnHover: true,
      clickToClose: true,
    });
  }

  errorEvent() {
    this._service.error('Unexpected error!', 'Click to undo...', {
      timeOut: 4000,
      showProgressBar: true,
      pauseOnHover: true,
      clickToClose: true,
    });
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
    this.httpService.postData(education)
      .subscribe(
        (data: Education) => {
          this.receivedEducation = data;
          this.done = true;
          this.error = undefined;
          this.successEvent();
        },
        error => { this.error = error; this.errorEvent(); }
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
  }

  ngOnInit() {
    this.addEducationalInstitution.nativeElement.hidden = true;
    this.education.educationLevelId = this.educationLevel[0];
    this.education.educationInstitutionId = this.educationInstitutions[0];
    this.education.languageId = this.language[0];
    this.newEducationInstitution.typeId = this.edTypes[0];
    this.newEducationInstitution.estCityId = this.estCities[0];

    this.httpService.getAbitur().subscribe(data => {
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
    });
    this.httpService.getAbitur().subscribe(data => this.httpService.userid = data['id']);
    this.httpService.getEdLevel().subscribe(data => this.educationLevel = data['content']);
    this.httpService.getLanguage().subscribe(data => this.language = data['content']);
    this.httpService.getEdType().subscribe(data => this.edTypes = data['content']);
    this.httpService.getEstCity().subscribe(data => this.estCities = data['content']);
  }

}
