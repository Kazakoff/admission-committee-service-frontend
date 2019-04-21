import {Component, OnInit} from '@angular/core';
import {Registration} from './registration';
import {HttpService} from './registration.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'reg',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  providers: [HttpService]
})
export class RegistrationComponent implements OnInit {
  error: number;
  recoverError: number;
  constructor(private httpService: HttpService, private _service: NotifierService) {
  }
  registration: Registration = new Registration();
  roles: any = [{id: 3, name: ''}];

  successEvent() {
    this._service.notify('info',
      'Регистрация практически завершена! Сейчас проверьте свой e-mail и подтвердите регистрацию!');
  }

  errorEvent() {
    this._service.notify('error', 'Ошибка регистрации! Пожалуйста, попробуйте ещё раз!');
  }

  submit(registration: Registration) {
    this.httpService.postData(registration)
      .subscribe(
        (data: Registration) => { this.error = undefined; this.successEvent();
        },
        error => { this.error = error; this.errorEvent(); }
      );
  }

  ngOnInit() {
    this.httpService.getRoles().subscribe(data => {
      this.roles = data;
      this.registration.roleId = this.roles.find(role => role.name === 'ABITURIENT');
    });
  }
}
