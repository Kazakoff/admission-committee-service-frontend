import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Registration} from './registration';
import {POST_REGISTRATION_ACCOUNT, GET_REGISTRATION_ROLE} from '../URLS';

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

    return this.http.post(POST_REGISTRATION_ACCOUNT, body, {
      headers: this.addHeaders(),
      withCredentials: true
    });
  }

  getRoles() {
    return this.http.get(GET_REGISTRATION_ROLE, {headers: this.addHeaders(), withCredentials: true});
  }

}
