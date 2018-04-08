import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Address} from './address';

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

  postData(address: Address) {

    const body = {
      postCode: address.postCode,
      cityId: address.cityId.id,
      street: address.street,
      home: address.home,
      building: address.building,
      appartment: address.appartment,
      phone: address.phone,

    };

    return this.http.put('http://86.57.182.101:8005/abiturient/address/' + this.userid, body, {
      headers: this.addHeaders(),
      withCredentials: true
    });
  }

  getCity() {
    return this.http.get('http://86.57.182.101:8005/city/contains?fragment=', {headers: this.addHeaders(), withCredentials: true});
  }

  getAbitur() {
    return this.http.get('http://86.57.182.101:8005/abiturient', {headers: this.addHeaders(), withCredentials: true});
  }

}
