import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CompetitionInfo} from './competitionInfo';
import {GET_ABITURIENT, PUT_ABITURIENT_COMPETITION, GET_EDUCATIONAL_DOCUMENT_TYPE_COMPETITION, GET_SUBJECT_COMPETITION} from '../URLS';

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

  postData(competitionInfo: CompetitionInfo) {

    const body = {
      documents: competitionInfo.documents,
      specialities: competitionInfo.specialities,
    };

    return this.http.put(PUT_ABITURIENT_COMPETITION + this.userid, body, {
      headers: this.addHeaders(),
      withCredentials: true
    });
  }

  getAbitur() {
    return this.http.get(GET_ABITURIENT, {headers: this.addHeaders(), withCredentials: true});

  }

  getSpeciality(educationTime, educationForm, facultyId) {
    const body = {
      educationTime: educationTime,
      educationForm: educationForm,
      facultyId: facultyId,
    };
    return this.http.post('http://86.57.182.101:8005/speciality', body, {headers: this.addHeaders(), withCredentials: true});
  }

  getFaculties() {
    return this.http.get('http://86.57.182.101:8005/faculty/contains?fragment=', {headers: this.addHeaders(), withCredentials: true});
}

  getEdDocType() {
    return this.http.get(GET_EDUCATIONAL_DOCUMENT_TYPE_COMPETITION, {headers: this.addHeaders(), withCredentials: true});
  }

  getSubject() {
    return this.http.get(GET_SUBJECT_COMPETITION, {headers: this.addHeaders(), withCredentials: true});
  }

}
