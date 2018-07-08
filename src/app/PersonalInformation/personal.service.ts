import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Personal} from './personal';
import { PUT_ABITURIENT_PROFILE, GET_ABITURIENT, GET_DOC_SERIA_PROFILE, GET_DOC_TYPE_PROFILE, GET_NATIONALITY_PROFILE } from '../URLS';


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

  postData(personal: Personal) {

    const body = {
      documentTypeId: personal.documentTypeId.id,
      documentSeria: personal.documentSeria,
      documentNumber: personal.documentNumber,
      documentDate: personal.documentDate,
      documentOrgan: personal.documentOrgan,
      firstName: personal.firstName,
      lastName: personal.lastName,
      middleName: personal.middleName,
      birthDate: personal.birthDate,
      birthPlace: personal.birthPlace,
      nationalityId: personal.nationalityId.id,
      identificationNumber: personal.identificationNumber,
      sex: personal.sex
    };

    return this.http.put(PUT_ABITURIENT_PROFILE + this.userid, body, {
      headers: this.addHeaders(),
      withCredentials: true
    });
  }

  getAbitur() {
    return this.http.get(GET_ABITURIENT, {headers: this.addHeaders(), withCredentials: true});
  }

  getDocType() {
    return this.http.get(GET_DOC_TYPE_PROFILE, {headers: this.addHeaders(), withCredentials: true});
  }

  getNationality() {
    return this.http.get(GET_NATIONALITY_PROFILE, {headers: this.addHeaders(), withCredentials: true});
  }
}
