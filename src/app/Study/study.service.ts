import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Education} from './education';
import {GET_ABITURIENT, PUT_ABITURIENT_EDUCATION, GET_EDUCATIONAL_INSTITUTE_FRAGMENT_EDUCATION,
  GET_EDUCATIONAL_LEVEL_EDUCATION, GET_LANGUAGE_EDUCATION} from '../URLS';

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

  postData(education: Education) {
    const body = {
      educationInstitutionId: education.educationInstitutionId.id,
      endYear: education.endYear,
      educationLevelId: education.educationLevelId.id,
      languageId: education.languageId.id,
      goldMedalist: education.goldMedalist,
      honours: education.honours,
    };

    return this.http.put(PUT_ABITURIENT_EDUCATION + this.userid, body, {
      headers: this.addHeaders(),
      withCredentials: true
    });
  }

  getAbitur() {
    return this.http.get(GET_ABITURIENT, {headers: this.addHeaders(), withCredentials: true});
  }

  getEducationInstituteFragment(value) {
    return this.http.get(GET_EDUCATIONAL_INSTITUTE_FRAGMENT_EDUCATION + value + '&size=40',
      {headers: this.addHeaders(), withCredentials: true});
  }

  getEdLevel() {
    return this.http.get(GET_EDUCATIONAL_LEVEL_EDUCATION, {headers: this.addHeaders(), withCredentials: true});
  }

  getLanguage() {
    return this.http.get(GET_LANGUAGE_EDUCATION, {headers: this.addHeaders(), withCredentials: true});
  }

}
