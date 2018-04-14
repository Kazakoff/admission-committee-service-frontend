import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CompetitionInfo} from './competitionInfo';

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
      privilleges: competitionInfo.privilleges,
    };

    return this.http.put('http://86.57.182.101:8005/abiturient/competition/' + this.userid, body, {
      headers: this.addHeaders(),
      withCredentials: true
    });
  }

  getAbitur() {
    return this.http.get('http://86.57.182.101:8005/abiturient', {headers: this.addHeaders(), withCredentials: true});

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
