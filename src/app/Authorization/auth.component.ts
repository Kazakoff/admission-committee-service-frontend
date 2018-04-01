import {Component, OnInit} from '@angular/core';
import {HttpService} from './auth.service';
import {Auth} from './auth';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {timeout} from 'rxjs/operators';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/timeout';

@Component({
  selector: 'auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  providers: [HttpService]
})
export class AuthComponent implements OnInit {
  constructor(private http: HttpClient) {
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

  submit() {
    this.http.get('http://localhost:5000/api/token/generate', {headers: this.addHeaders(), withCredentials: true})
      .subscribe(
        (data) => {
          this.token = data['token'];
          localStorage.setItem('token', JSON.stringify(this.token));
          location.replace('/');
        },
        error => { this.error = error; }
      );
  }

  ngOnInit() {

  }
}
