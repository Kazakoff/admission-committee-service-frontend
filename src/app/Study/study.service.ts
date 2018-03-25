import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Education} from './education';


@Injectable()
export class HttpService {

  constructor(private http: HttpClient) {
  }

  userid: number;
  public token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyTmFtZSIsImV4cCI6NjE1MTc5OTg4MDAsInVzZXJJZCI6MSwicm9sZXMiOiJST0xFX0FETUlOIn0.' +
    's2SxLDDSkjjkZ2Jx_cbeh17DuSx4dDogOQmQncRILik';

  addHeaders() {
    const myHeaders = new HttpHeaders()
      .set('Authorization', 'Bearer ' + this.token)
      .set('Content-Type', 'application/json');
    return myHeaders;
  }

  postData(education: Education) {
    const body = {
      uoName: education.uoName,
      educationTypeId: education.educationTypeId,
      endYear: education.endYear,
      educationLevelId: education.educationLevelId,
      establishmentCityId: education.establishmentCityId,
      languageId: education.languageId,
      goldMedalist: education.goldMedalist,
      honours: education.honours,
      notCitizen: education.notCitizen
    };

    return this.http.post('http://localhost:8005/abiturient/education/' + this.userid, body, {
      headers: this.addHeaders(),
      withCredentials: true
    });
  }

  getAbitur() {
    return this.http.get('http://localhost:8005/abiturient', {headers: this.addHeaders(), withCredentials: true});
  }

  getEdType() {
    return this.http.get('http://localhost:8005/edtype/contains?fragment=', {headers: this.addHeaders(), withCredentials: true});
  }

  getEdLevel() {
    return this.http.get('http://localhost:8005/edlevel/contains?fragment=', {headers: this.addHeaders(), withCredentials: true});
  }

  getEstablishmentCity() {
    return this.http.get('http://localhost:8005/estcity/contains?fragment=', {headers: this.addHeaders(), withCredentials: true});
  }

  getLanguage() {
    return this.http.get('http://localhost:8005/language/contains?fragment=', {headers: this.addHeaders(), withCredentials: true});
  }

}
