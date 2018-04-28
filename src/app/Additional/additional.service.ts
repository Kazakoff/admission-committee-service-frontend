import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Additional} from './additional';
import {GET_ABITURIENT, PUT_ABITURIENT_ADDITONAL_INFORMATION} from '../URLS';

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

  postData(additional: Additional) {

    const body = {
      fatherFIO: additional.fatherFIO,
      fatherWork: additional.fatherWork,
      fatherPhone: additional.fatherPhone,
      motherFIO: additional.motherFIO,
      motherWork: additional.motherWork,
      motherPhone: additional.motherPhone,
      childCount: additional.childCount,
      workPlace: additional.workPlace,
      experience: additional.experience,
      reAdmission: additional.reAdmission,
    };

    return this.http.put(PUT_ABITURIENT_ADDITONAL_INFORMATION + this.userid, body, {
      headers: this.addHeaders(),
      withCredentials: true
    });
  }

  getAbitur() {
    return this.http.get(GET_ABITURIENT, {headers: this.addHeaders(), withCredentials: true});
  }

}
