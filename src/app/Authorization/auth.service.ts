import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Auth} from './auth';

@Injectable()
export class HttpService {
auth: Auth = new Auth();
  constructor(private http: HttpClient) {
  }

  addHeaders() {
    const myHeaders = new HttpHeaders()
      .set('Authorization', 'Basic ' + btoa(this.auth.email + ':' + this.auth.password))
      .set('Content-Type', 'application/json');
    return myHeaders;
  }

  getAuthorize() {
    return this.http.get('http://86.57.182.101:5000/api/token/generate', {headers: this.addHeaders()});
  }

}
