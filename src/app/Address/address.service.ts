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
      country: address.country, // add

      streetIn: address.streetIn,
      houseIn: address.houseIn,
      buildingIn: address.buildingIn,
      apartmentIn: address.apartmentIn,
      regionIn: address.regionIn,
      districtIn: address.districtIn,
      cityIn: address.cityIn,
      countryIn: address.countryIn, // add
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
