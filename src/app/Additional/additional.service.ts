import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Additional} from './additional';

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
      note: additional.note
    };

    return this.http.put('http://localhost:8005/abiturient/addinfo/' + this.userid, body, {
      headers: this.addHeaders(),
      withCredentials: true
    });
  }

  getAbitur() {
    return this.http.get('http://localhost:8005/abiturient', {headers: this.addHeaders(), withCredentials: true});
  }

}
