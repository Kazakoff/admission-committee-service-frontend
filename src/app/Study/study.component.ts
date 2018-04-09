import {Component, OnInit} from '@angular/core';
import {Education} from './education';
import {EducationLevel} from './educationLevel';
import {Language} from './language';
import {HttpService} from './study.service';
import {EducationInstitution} from './educationInstitution';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {NotificationsService} from 'angular2-notifications';

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
  educationInstitutions: EducationInstitution[] = [{id: 1, name: ''}];
  page = 0;

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

  getCity() {
    return this.httpClient.get('http://86.57.182.101:8005/edinst/contains?fragment=&size=40&page=' + this.page,
      {headers: this.addHeaders(), withCredentials: true});
  }

  getEducationInstituteFragment(value) {
    return this.httpClient.get('http://86.57.182.101:8005/edinst/contains?fragment=' + value + '&size=40',
      {headers: this.addHeaders(), withCredentials: true});
  }

  onInputChange(value) {
    this.getEducationInstituteFragment(value).subscribe((response) => {
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

  ngOnInit() {
    this.education.educationLevelId = this.educationLevel[0];
    this.education.educationInstitutionId = this.educationInstitutions[0];
    this.education.languageId = this.language[0];

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
  }

}
