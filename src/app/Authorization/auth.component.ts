import {Component, OnInit} from '@angular/core';
import {HttpService} from './auth.service';
import {Auth} from './auth';
import {HttpClient, HttpHeaders} from '@angular/common/http';

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
error: any;
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
        },
        error => { setTimeout(function () { this.error = error.status;
        }, 0); }
      );
    setTimeout(function() { console.log(this.error); }, 1000);
  }

  ngOnInit() {

  }
}
