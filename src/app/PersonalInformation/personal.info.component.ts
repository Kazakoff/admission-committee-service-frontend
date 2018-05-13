import {Component, OnInit} from '@angular/core';
import {Personal} from './personal';
import {HttpService} from './personal.service';
import {Doctype} from './doctype';
import {Nationality} from './nationality';
import {DatePipe} from '@angular/common';
import {NotificationsService} from 'angular2-notifications';

@Component({
  selector: 'personal',
  templateUrl: './personal.info.component.html',
  styles: [`
    input.ng-touched.ng-invalid {
      border: solid red 2px;
    }

    input.ng-touched.ng-valid {
      border: solid green 2px;
    }
  `],
  providers: [HttpService, DatePipe]
})

export class PersonalInfoComponent implements OnInit {

  personal: Personal = new Personal();
  personalObject: Personal[] = [];
  error: any;
  token = JSON.parse(localStorage.getItem('token'));
  receivedPersonal: Personal;
  done = false;
  doctype: Doctype[] = [{
    id: 1, name: ''
  }];
  nationality: Nationality[] = [{
    id: 1, name: ''
  }];
  mytime: Date = new Date();
  rightNow: Date = new Date();
  minDate: Date = new Date(1930, 0, 1);

  constructor(private httpService: HttpService, public datepipe: DatePipe, private _service: NotificationsService) {
  }

  successEvent() {
    this._service.success('Форма отправлена успешно!', 'Нажмите чтобы скрыть...', {
      timeOut: 4000,
      showProgressBar: true,
      pauseOnHover: true,
      clickToClose: true
    });
  }

  errorEvent() {
    this._service.error('Неожиданная ошибка!', 'Нажмите чтобы скрыть...', {
      timeOut: 4000,
      showProgressBar: true,
      pauseOnHover: true,
      clickToClose: true,
    });
  }

  submit(personal: Personal) {
    this.httpService.postData(personal)
      .subscribe(
        (data: Personal) => {
          this.receivedPersonal = data;
          this.done = true;
          this.error = undefined;
          this.successEvent();
        },
        error => { this.error = error; this.errorEvent(); }
      );
  }

  ngOnInit() {
    console.log(this.rightNow);
    this.personal.documentTypeId = this.doctype[0];
    this.personal.nationalityId = this.nationality[0];

    this.httpService.getDocType().subscribe(data => this.doctype = data['content']);
    this.httpService.getNationality().subscribe(data => this.nationality = data['content']);

    this.httpService.getAbitur().subscribe(data => {
      this.personalObject = data['profileInfo'];
      if (this.personalObject == null) {
        console.log('Set inputs');
      } else {
        this.personal.documentTypeId = this.personalObject['documentType'];
        this.personal.documentSeria = this.personalObject['documentSeria'];
        this.personal.documentNumber = this.personalObject['documentNumber'];
        this.personal.documentDate = this.datepipe.transform(this.personalObject['documentDate'], 'yyyy-MM-dd');
        this.personal.documentOrgan = this.personalObject['documentOrgan'];
        this.personal.firstName = this.personalObject['firstName'];
        this.personal.lastName = this.personalObject['lastName'];
        this.personal.middleName = this.personalObject['middleName'];
        this.personal.birthDate = this.datepipe.transform(this.personalObject['birthDate'], 'yyyy-MM-dd');
        this.personal.birthPlace = this.personalObject['birthPlace'];
        this.personal.nationalityId = this.personalObject['nationality'];
        this.personal.identificationNumber = this.personalObject['identificationNumber'];
        this.personal.sex = this.personalObject['sex'];
      }
      this.httpService.userid = data['id'];
    });

  }
}
