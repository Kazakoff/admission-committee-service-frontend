import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { GET_STATISTICS } from '../URLS';

@Injectable()
export class HttpService {
  constructor(private http: HttpClient) {
  }
  userid: number;
  public token = JSON.parse(localStorage.getItem('token'));

  addHeaders() {
    const myHeaders = new HttpHeaders()
      .set('Authorization', 'Bearer ' + this.token)
      .set('Content-Type', 'application/json');
    return myHeaders;
  }

  getStats() {
    return this.http.get(GET_STATISTICS, {headers: this.addHeaders(), withCredentials: true});
  }
}
