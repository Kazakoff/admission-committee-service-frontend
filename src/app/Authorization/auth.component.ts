import {Component, OnInit} from '@angular/core';
import {HttpService} from './auth.service';
import {Auth} from './auth';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {timeout} from 'rxjs/operators';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/timeout';
import {NotificationsService} from 'angular2-notifications';

@Component({
  selector: 'auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  providers: [HttpService]
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
    this._service.success('Welcome to admission-committee!', 'Click to undo...', {
      timeOut: 4000,
      showProgressBar: true,
      pauseOnHover: true,
      clickToClose: true
    });
  }

  errorEvent() {
    this._service.error('Authorization error!', 'Click to undo...', {
      timeOut: 4000,
      showProgressBar: true,
      pauseOnHover: true,
      clickToClose: true
    });
  }

  submit() {
    this.http.get('http://86.57.182.101:5000/api/token/generate', {headers: this.addHeaders(), withCredentials: true})
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
