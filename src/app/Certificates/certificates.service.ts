import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

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

  getEdDocType() {
    return this.http.get('http://86.57.182.101:8005/eddoctype/contains?fragment=', {headers: this.addHeaders(), withCredentials: true});
  }

  getSubject() {
    return this.http.get('http://86.57.182.101:8005/subject/contains?fragment=', {headers: this.addHeaders(), withCredentials: true});
  }

  getPrivilleges() {
    return this.http.get('http://86.57.182.101:8005/privillege/contains?fragment=', {headers: this.addHeaders(), withCredentials: true});
  }
}
