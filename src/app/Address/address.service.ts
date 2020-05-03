import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Address } from "./address";
import {
  GET_ABITURIENT,
  PUT_ABITURIENT_ADDRESS,
  GET_CITY_FRAGMENT_ADDRESS,
  POST_CITY,
  GET_REGION_FRAGMENT,
} from "../URLS";
import { NewCity } from "./newCity";

@Injectable()
export class HttpService {
  constructor(private http: HttpClient) {}

  userid: number;
  public token = JSON.parse(localStorage.getItem("token"));

  addHeaders() {
    const myHeaders = new HttpHeaders()
      .set("Authorization", "Bearer " + this.token)
      .set("Content-Type", "application/json");
    return myHeaders;
  }
  // добавить поля
  postData(address: Address) {
    const body = {
      postCode: address.postCode,
      street: address.street,
      house: address.house,
      building: address.building,
      apartment: address.apartment,
      phone: address.phone,
      region: address.region,
      district: address.district,
      city: address.city,
      country: address.county, // add

      street_in: address.street_in,
      house_in: address.house_in,
      building_in: address.building_in,
      apartment_in: address.apartment_in,
      region_in: address.region_in,
      district_in: address.district_in,
      city_in: address.city_in,
      country_in: address.county_in, // add
    };

    return this.http.put(PUT_ABITURIENT_ADDRESS + this.userid, body, {
      headers: this.addHeaders(),
      withCredentials: true,
    });
  }

  getAbitur() {
    return this.http.get(GET_ABITURIENT, {
      headers: this.addHeaders(),
      withCredentials: true,
    });
  }
}
