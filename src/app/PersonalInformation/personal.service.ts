import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Personal} from './personal';
import {PersonalInfoComponent} from './personal.info.component';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class HttpService {
  constructor(private http: HttpClient) {
  }
personalObject: Personal[] = [];
  userid: number;
  public token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyTmFtZSIsImV4cCI6NjE1MTc5OTg4MDAsInVzZXJJZCI6MSwicm9sZXMiOiJST0xFX0FETUlOIn0.' +
    's2SxLDDSkjjkZ2Jx_cbeh17DuSx4dDogOQmQncRILik';

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

    return this.http.put('http://localhost:8005/abiturient/profile/' + this.userid, body, {
      headers: this.addHeaders(),
      withCredentials: true
    });
  }

  getAbitur() {
    return this.http.get('http://localhost:8005/abiturient', {headers: this.addHeaders(), withCredentials: true});

  }
  getDocSeria() {
    return this.http.get('http://localhost:8005/docseria/contains?fragment=', {headers: this.addHeaders(), withCredentials: true});
  }

  getDocType() {
    return this.http.get('http://localhost:8005/doctype/contains?fragment=', {headers: this.addHeaders(), withCredentials: true});
  }

  getNationality() {
    return this.http.get('http://localhost:8005/nationality/contains?fragment=', {headers: this.addHeaders(), withCredentials: true});
  }
}
