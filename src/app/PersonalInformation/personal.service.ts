import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Personal} from './personal';
import {PersonalInfoComponent} from './personal.info.component';
import {Observable} from 'rxjs/Observable';

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
      documentSeriaId: personal.documentSeriaId.id,
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

    return this.http.put('http://86.57.182.101:8005/abiturient/profile/' + this.userid, body, {
      headers: this.addHeaders(),
      withCredentials: true
    });
  }

  getAbitur() {
    return this.http.get('http://86.57.182.101:8005/abiturient', {headers: this.addHeaders(), withCredentials: true});

  }
  getDocSeria() {
    return this.http.get('http://86.57.182.101:8005/docseria/contains?fragment=', {headers: this.addHeaders(), withCredentials: true});
  }

  getDocType() {
    return this.http.get('http://86.57.182.101:8005/doctype/contains?fragment=', {headers: this.addHeaders(), withCredentials: true});
  }

  getNationality() {
    return this.http.get('http://86.57.182.101:8005/nationality/contains?fragment=', {headers: this.addHeaders(), withCredentials: true});
  }
}
