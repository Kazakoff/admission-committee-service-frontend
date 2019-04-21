import {Component, OnInit} from '@angular/core';
import {Registration} from './registration';
import {HttpService} from './registration.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'reg',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  providers: [HttpService]
})
export class RegistrationComponent implements OnInit {
  error: number;
  recoverError: number;
  constructor(private httpService: HttpService, private _service: NotificationsService) {
  }
  registration: Registration = new Registration();
  roles: any = [{id: 3, name: ''}];

  successEvent() {
    this._service.info('Регистрация практически завершена! Сейчас проверьте свой e-mail и подтвердите регистрацию!',
      'Нажмите чтобы скрыть...', {
      timeOut: 4000,
      showProgressBar: true,
      pauseOnHover: true,
      clickToClose: true
    });
  }

  errorEvent() {
    this._service.error('Ошибка регистрации! Пожалуйста, попробуйте ещё раз!', 'Нажмите чтобы скрыть...', {
      timeOut: 4000,
      showProgressBar: true,
      pauseOnHover: true,
      clickToClose: true
    });
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
