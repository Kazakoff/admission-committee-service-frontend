import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Address} from './address';
import {GET_ABITURIENT, PUT_ABITURIENT_ADDRESS, GET_CITY_FRAGMENT_ADDRESS} from '../URLS';

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

    return this.http.put(PUT_ABITURIENT_ADDRESS + this.userid, body, {
      headers: this.addHeaders(),
      withCredentials: true
    });
  }

  getCityFragment(value) {
    return this.http.get(GET_CITY_FRAGMENT_ADDRESS + value + '&size=40',
      {headers: this.addHeaders(), withCredentials: true});
  }

  getAbitur() {
    return this.http.get(GET_ABITURIENT, {headers: this.addHeaders(), withCredentials: true});
  }

}
