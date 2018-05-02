import {Component, OnInit} from '@angular/core';
import {Auth} from './auth';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/timeout';
import {NotificationsService} from 'angular2-notifications';
import {GENERATE_TOKEN} from '../URLS';

@Component({
  selector: 'auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  constructor(private http: HttpClient, private _service: NotificationsService) {
  }
auth: Auth = new Auth();
error: number;
token: any;

  addHeaders() {
    const myHeaders = new HttpHeaders()
      .set('Authorization', 'Basic ' + btoa(this.auth.email + ':' + this.auth.password))
      .set('Content-Type', 'application/json');
    return myHeaders;
  }

  successEvent() {
    this._service.success('Добро пожаловать в приёмную комиссию', 'Нажмите чтобы скрыть...', {
      timeOut: 4000,
      showProgressBar: true,
      pauseOnHover: true,
      clickToClose: true
    });
  }

  errorEvent() {
    this._service.error('Ошибка авторизации!', 'Нажмите чтобы скрыть...', {
      timeOut: 4000,
      showProgressBar: true,
      pauseOnHover: true,
      clickToClose: true
    });
  }

  submit() {
    this.http.get(GENERATE_TOKEN, {headers: this.addHeaders(), withCredentials: true})
      .subscribe(
        (data) => {
          this.token = data['token'];
          localStorage.setItem('token', JSON.stringify(this.token));
          this.error = undefined;
          this.successEvent();
          location.replace('/');
        },
        error => { this.error = error; this.errorEvent(); }
      );
  }

  ngOnInit() {

  }
}
