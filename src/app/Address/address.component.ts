import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Address } from "./address";
import { HttpService } from "./address.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { NotifierService } from "angular-notifier";
import { Region } from "./region";
import { District } from "./district";
import { NewCity } from "./newCity";
import { GET_REGION } from "../URLS";
import { AppDataService } from "../app.data.service";
import { environment } from "../../environments/environment";

@Component({
  selector: "address",
  styles: [
    `
      input.ng-touched.ng-invalid {
        border: solid red 2px;
      }

      input.ng-touched.ng-valid {
        border: solid green 2px;
      }
    `,
  ],
  templateUrl: "./address.component.html",
  providers: [HttpService, HttpClient],
})
export class AddressComponent implements OnInit {
  token = JSON.parse(localStorage.getItem("token"));
  done = false;
  address: Address = new Address();
  addressObject: Address[] = [];
  receivedAddress: Address;
  cities: any[] = [{ id: 1, name: "" }];
  regions: Region[] = [];
  district: District[] = [];
  cityTypes: string[] = ["г. ", "д. ", "гп. ", "с. ", "аг. ", "п. ", "х. "];
  newCity: NewCity = new NewCity();
  page = 0;
  error: any;
  errorCity: any;
  tokenInvalid: boolean;
  isAbiturientLoading: boolean;
  isRegionLoading: boolean;
  isSubmitLoading: boolean;

  @ViewChild("addCityLabel")
  addCityLabel: ElementRef;

  @ViewChild("region")
  region: ElementRef;

  @ViewChild("typeCity")
  typeCity: ElementRef;

  @ViewChild("nameCity")
  nameCity: ElementRef;

  @ViewChild("districtCity")
  districtCity: ElementRef;

  @ViewChild("citySelect")
  citySelect: ElementRef;

  @ViewChild("showCityAddButton")
  showCityAddButton: ElementRef;

  constructor(
    private httpService: HttpService,
    private httpClient: HttpClient,
    private _service: NotifierService,
    private http: HttpClient,
    private appData: AppDataService
  ) {}

  addHeaders() {
    const myHeaders = new HttpHeaders()
      .set("Authorization", "Bearer " + this.token)
      .set("Content-Type", "application/json");
    return myHeaders;
  }

  successEvent() {
    this._service.notify("success", "Форма отправлена успешно!");
  }

  errorEvent() {
    this._service.notify("error", "Неожиданная ошибка!");
  }

  submit(address: Address, nextLink: string) {
    if (this.appData.approve) {
      location.replace(environment.authRedirectURL + nextLink);
      return;
    }
    this.isSubmitLoading = true;
    this.httpService.postData(address).subscribe(
      (data: Address) => {
        this.receivedAddress = data;
        this.done = true;
        this.error = undefined;
        this.successEvent();
        this.isSubmitLoading = false;
        location.replace(environment.authRedirectURL + nextLink);
      },
      (error) => {
        this.error = error;
        this.errorEvent();
        this.isSubmitLoading = false;
        if (
          confirm(
            "Форма содержит недопустимые значени. Переход на другую страницу не сохранит данные на форме. Вы хотите покинуть страницу?"
          )
        )
          location.replace(environment.authRedirectURL + nextLink);
      }
    );
  }
  copyAdress() {
    this.address.country = this.address.countryIn;
    this.address.postCode = this.address.postCodeIn;
    this.address.street = this.address.streetIn;
    this.address.house = this.address.houseIn;
    this.address.building = this.address.buildingIn;
    this.address.apartment = this.address.apartmentIn;
    this.address.district = this.address.districtIn;
    this.address.region = this.address.regionIn;
    this.address.city = this.address.cityIn;
  }
  loadAbiturient() {
    this.isAbiturientLoading = true;
    this.httpService.getAbitur().subscribe(
      (data) => {
        this.httpService.userid = data["id"];
        this.tokenInvalid = false;
        this.addressObject = data["addressInfo"];
        if (this.addressObject == null) {
          console.log("set inputs");
        } else {
          this.address.postCode = this.addressObject["postCode"];
          this.address.postCodeIn = this.addressObject["postCodeIn"];
          this.address.street = this.addressObject["street"];
          this.address.house = this.addressObject["house"];
          this.address.building = this.addressObject["building"];
          this.address.apartment = this.addressObject["apartment"];
          this.address.phone = this.addressObject["phone"];
          this.address.district = this.addressObject["district"];
          this.address.region = this.addressObject["region"];
          this.address.city = this.addressObject["city"];
          this.address.country = this.addressObject["country"]; //add

          // add
          this.address.streetIn = this.addressObject["streetIn"];
          this.address.houseIn = this.addressObject["houseIn"];
          this.address.buildingIn = this.addressObject["buildingIn"];
          this.address.apartmentIn = this.addressObject["apartmentIn"];
          this.address.districtIn = this.addressObject["districtIn"];
          this.address.regionIn = this.addressObject["regionIn"];
          this.address.cityIn = this.addressObject["cityIn"];
          this.address.countryIn = this.addressObject["countryIn"];
        }
        this.isAbiturientLoading = false;
      },
      (error) => {
        if (error.status === 401) {
          this.tokenInvalid = true;
        }
        this.isAbiturientLoading = false;
      }
    );
  }

  ngOnInit() {
    this.isAbiturientLoading = false;
    this.tokenInvalid = false;
    this.isSubmitLoading = false;

    this.loadAbiturient();
  }
}
