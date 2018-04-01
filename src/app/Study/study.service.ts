import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Education} from './education';


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

    return this.http.put('http://localhost:8005/abiturient/education/' + this.userid, body, {
      headers: this.addHeaders(),
      withCredentials: true
    });
  }

  getAbitur() {
    return this.http.get('http://localhost:8005/abiturient', {headers: this.addHeaders(), withCredentials: true});
  }

  getEducationInstitution() {
    return this.http.get('http://localhost:8005/edinst/contains?fragment=', {headers: this.addHeaders(), withCredentials: true});
  }

  getEdLevel() {
    return this.http.get('http://localhost:8005/edlevel/contains?fragment=', {headers: this.addHeaders(), withCredentials: true});
  }

  getLanguage() {
    return this.http.get('http://localhost:8005/language/contains?fragment=', {headers: this.addHeaders(), withCredentials: true});
  }

}
