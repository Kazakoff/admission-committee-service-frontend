import {Component, OnInit} from '@angular/core';
import {Auth} from './auth';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';


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
    return new HttpHeaders()
      .set('Authorization', 'Basic QURNSVNTSU9OX0NMSUVOVDpoMnUkTVRONVcm')
      .set('Content-Type', 'application/json');
  }

  addParams() {
    return new HttpParams()
      .set('grant_type', 'password')
      .set('username', this.auth.email)
      .set('password', this.auth.password);
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
    this.http.post(GENERATE_TOKEN, {}, {headers: this.addHeaders(), withCredentials: true, params: this.addParams()})
      .subscribe(
        (data) => {
          this.token = data['access_token'];
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
