import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Registration} from './registration';

@Injectable()
export class HttpService {

  constructor(private http: HttpClient) {
  }

  addHeaders() {
    const myHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json');
    return myHeaders;
  }

  postData(registration: Registration) {

    const body = {
      roleId: registration.roleId.id,
      email: registration.email,
      password: registration.password
    };

    return this.http.post('http://86.57.182.101:5000/account', body, {
      headers: this.addHeaders(),
      withCredentials: true
    });
  }

  getRoles() {
    return this.http.get('http://86.57.182.101:5000/role', {headers: this.addHeaders(), withCredentials: true});
  }

}
