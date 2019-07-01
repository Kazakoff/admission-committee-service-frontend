import {Component, OnInit} from '@angular/core';

import { NotifierService } from 'angular-notifier';
import {HttpService} from './statistics.service';

@Component({
  selector: 'stats',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css'],
  providers: [HttpService],
})
export class StatisticsComponent implements OnInit {
  token = JSON.parse(localStorage.getItem('token'));
  error: number;
  statistics: any;
  countWithSpeciality: any;
  countWithoutSpeciality: any;
  summaryCountApproved: any;

  constructor(private httpService: HttpService, private _service: NotifierService) {
  }

  successEvent() {
    this._service.notify('success', 'Добро пожаловать в приёмную комиссию');
  }

  errorEvent() {
    this._service.notify('error', 'Ошибка авторизации!');
  }

  compareSpeciality(a, b) {
    if (a.speciality > b.speciality) { return 1; }
    if (a.speciality < b.speciality) { return -1; }
    return 0;
  }

  compareSpecialityReverse(a, b) {
    if (a.speciality < b.speciality) { return 1; }
    if (a.speciality > b.speciality) { return -1; }
    return 0;
  }

  compareEducationForm(a, b) {
    if (a.educationForm > b.educationForm) { return 1; }
    if (a.educationForm < b.educationForm) { return -1; }
    return 0;
  }

  compareEducationFormReverse(a, b) {
    if (a.educationForm < b.educationForm) { return 1; }
    if (a.educationForm > b.educationForm) { return -1; }
    return 0;
  }

  compareEducationTime(a, b) {
    if (a.educationTime > b.educationTime) { return 1; }
    if (a.educationTime < b.educationTime) { return -1; }
    return 0;
  }

  compareEducationTimeReverse(a, b) {
    if (a.educationTime < b.educationTime) { return 1; }
    if (a.educationTime > b.educationTime) { return -1; }
    return 0;
  }

  sortBySpeciality() {
    const copySpec = this.statistics.slice().sort(this.compareSpeciality);
    if (this.statistics.length === copySpec.length && this.statistics.every((v, i) => v.speciality === copySpec[i].speciality)) {
      this.statistics.sort(this.compareSpecialityReverse);
    } else {
      this.statistics.sort(this.compareSpeciality);
    }
  }

  sortByEducationForm() {
    const copyType = this.statistics.slice().sort(this.compareEducationForm);
    if (this.statistics.length === copyType.length && this.statistics.every((v, i) => v.educationForm === copyType[i].educationForm)) {
      this.statistics.sort(this.compareEducationFormReverse);
    } else {
      this.statistics.sort(this.compareEducationForm);
    }
  }

  sortByEducationTime() {
    const copyForm = this.statistics.slice().sort(this.compareEducationTime);
    if (this.statistics.length === copyForm.length && this.statistics.every((v, i) => v.educationTime === copyForm[i].educationTime)) {
      this.statistics.sort(this.compareEducationTimeReverse);
    } else {
      this.statistics.sort(this.compareEducationTime);
    }
  }

  ngOnInit() {
    this.httpService.getStats().subscribe((data) => {
      this.statistics = data['specialities'];
      this.countWithSpeciality = data['countWithSpeciality'];
      this.countWithoutSpeciality = data['countWithoutSpeciality'];
      this.summaryCountApproved = data['summaryCountApproved'];
    });
  }
}
