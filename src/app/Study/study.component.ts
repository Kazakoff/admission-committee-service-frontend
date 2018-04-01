import {Component, OnInit} from '@angular/core';
import {Education} from './education';
import {EducationType} from './educationType';
import {EducationLevel} from './educationLevel';
import {EstablishmentCity} from './establishmentCity';
import {Language} from './language';
import {HttpService} from './study.service';

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

  education: Education = new Education();
  educationObject: Education[] = [];
  done = false;
  receivedEducation: Education;
  educationEdited: Education;

  educationType: EducationType[] = [{
    id: 1, name: ''
  }];
  educationLevel: EducationLevel[] = [{
    id: 1, name: ''
  }];
  establishmentCity: EstablishmentCity[] = [{
    id: 1, name: ''
  }];
  language: Language[] = [{
    id: 1, name: ''
  }];

  constructor(private httpService: HttpService) {
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
    this.education.educationTypeId = this.educationType[0];
    this.education.establishmentCityId = this.establishmentCity[0];
    this.education.languageId = this.language[0];

    this.httpService.getEdLevel().subscribe(data => {
      this.educationLevel = data['content'];
    });

    this.httpService.getAbitur().subscribe(data => {
      this.educationObject = data['educationInfo'];
      localStorage.setItem('education', JSON.stringify(this.educationObject));
    });

    this.educationEdited = JSON.parse(localStorage.getItem('education'));
    if (this.educationEdited == null) {
      console.log('Set inputs');
    } else {
      this.education.uoName = this.educationEdited['uoName'];
      this.education.educationTypeId = this.educationEdited['educationType'];
      this.education.notCitizen = this.educationEdited['notCitizen'];
      this.education.endYear = this.educationEdited['endYear'];
      this.education.educationLevelId = this.educationEdited['educationLevel'];
      this.education.establishmentCityId = this.educationEdited['establishmentCity'];
      this.education.languageId = this.educationEdited['language'];
      this.education.goldMedalist = this.educationEdited['goldMedalist'];
      this.education.honours = this.educationEdited['honours'];
    }

    this.httpService.getAbitur().subscribe(data => this.httpService.userid = data['id']);
    this.httpService.getEdType().subscribe(data => this.educationType = data['content']);

    this.httpService.getEstablishmentCity().subscribe(data => this.establishmentCity = data['content']);
    this.httpService.getLanguage().subscribe(data => this.language = data['content']);
  }

}
