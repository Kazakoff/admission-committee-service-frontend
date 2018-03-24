import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Address} from './address';

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

  postData(address: Address) {

    const body = {
      postcode: address.postcode,
      region: address.region,
      district: address.district,
      city: address.city,
      street: address.street,
      home: address.home,
      building: address.building,
      appartment: address.appartment,
      phone: address.phone,

    };

    return this.http.post('http://localhost:8005/abiturient/address/' + this.userid, body, {
      headers: this.addHeaders(),
      withCredentials: true
    });
  }

  getAbitur() {
    return this.http.get('http://localhost:8005/abiturient', {headers: this.addHeaders(), withCredentials: true});
  }

}
