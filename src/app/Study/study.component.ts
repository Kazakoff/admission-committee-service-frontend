import {Component, OnInit} from '@angular/core';
import {Education} from './education';
import {EducationLevel} from './educationLevel';
import {Language} from './language';
import {HttpService} from './study.service';
import {EducationInstitution} from './educationInstitution';
import {HttpClient, HttpHeaders} from '@angular/common/http';

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

  educationLevel: EducationLevel[] = [{
    id: 1, name: ''
  }];
  language: Language[] = [{
    id: 1, name: ''
  }];
  educationInstitutions: EducationInstitution[] = [{id: 1, name: ''}];
  page = 0;

  constructor(private httpService: HttpService, private httpClient: HttpClient) {
  }

  addHeaders() {
    const myHeaders = new HttpHeaders()
      .set('Authorization', 'Bearer ' + this.token)
      .set('Content-Type', 'application/json');
    return myHeaders;
  }

  getCity() {
    return this.httpClient.get('http://localhost:8005/edinst/contains?fragment=&size=40&page=' + this.page,
      {headers: this.addHeaders(), withCredentials: true});
  }

  getEducationInstituteFragment(value) {
    return this.httpClient.get('http://localhost:8005/edinst/contains?fragment=' + value + '&size=40',
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
        },
        error => console.log(error)
      );

  }

  ngOnInit() {
    this.education.educationLevelId = this.educationLevel[0];
    this.education.educationInstitutionId = this.educationInstitutions[0];
    this.education.languageId = this.language[0];

    this.httpService.getAbitur().subscribe(data => {
      this.educationObject = data['educationInfo'];
      localStorage.setItem('education', JSON.stringify(this.educationObject));
    });

    this.educationEdited = JSON.parse(localStorage.getItem('education'));
    if (this.educationEdited == null) {
      console.log('Set inputs');
    } else {
      this.education.educationInstitutionId = this.educationEdited['educationInstitution'];
      this.educationInstitutions.push(this.education.educationInstitutionId);
      this.education.endYear = this.educationEdited['endYear'];
      this.education.educationLevelId = this.educationEdited['educationLevel'];
      this.education.languageId = this.educationEdited['language'];
      this.education.goldMedalist = this.educationEdited['goldMedalist'];
      this.education.honours = this.educationEdited['honours'];
    }

    this.httpService.getAbitur().subscribe(data => this.httpService.userid = data['id']);
    this.httpService.getEdLevel().subscribe(data => this.educationLevel = data['content']);
    this.httpService.getLanguage().subscribe(data => this.language = data['content']);
  }

}
