import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Address} from './address';
import {HttpService} from './address.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {NotificationsService} from 'angular2-notifications';
import {Region} from './region';
import {District} from './district';
import {NewCity} from './newCity';
import {GET_REGION} from '../URLS';

@Component({
  selector: 'address',
  styles: [`
    input.ng-touched.ng-invalid {
      border: solid red 2px;
    }

    input.ng-touched.ng-valid {
      border: solid green 2px;
    }
  `],
  templateUrl: './address.component.html',
  providers: [HttpService, HttpClient]
})
export class AddressComponent implements OnInit {

  token = JSON.parse(localStorage.getItem('token'));
  done = false;
  address: Address = new Address();
  addressObject: Address[] = [];
  receivedAddress: Address;
  cities: any[] = [{id: 1, name: ''}];
  regions: Region[] = [];
  district: District[] = [];
  cityTypes: string[] = ['г. ', 'д. ', 'гп. ', 'с. ', 'аг. ', 'п. ', 'х. '];
  newCity: NewCity = new NewCity();
  page = 0;
  error: any;
  errorCity: any;
  tokenInvalid: boolean;
  isAbiturientLoading: boolean;
  isRegionLoading: boolean;
  isSubmitLoading: boolean;

  @ViewChild('addCityLabel')
  addCityLabel: ElementRef;

  @ViewChild('region')
  region: ElementRef;

  @ViewChild('typeCity')
  typeCity: ElementRef;

  @ViewChild('nameCity')
  nameCity: ElementRef;

  @ViewChild('districtCity')
  districtCity: ElementRef;

  @ViewChild('citySelect')
  citySelect: ElementRef;

  @ViewChild('showCityAddButton')
  showCityAddButton: ElementRef;

  constructor(private httpService: HttpService, private httpClient: HttpClient, private _service: NotificationsService,
              private http: HttpClient) {

  }

  addHeaders() {
    const myHeaders = new HttpHeaders()
      .set('Authorization', 'Bearer ' + this.token)
      .set('Content-Type', 'application/json');
    return myHeaders;
  }

  successEvent() {
    this._service.success('Форма отправлена успешно!', 'Нажмите чтобы скрыть...', {
      timeOut: 4000,
      showProgressBar: true,
      pauseOnHover: true,
      clickToClose: true
    });
  }

  errorEvent() {
    this._service.error('Неожиданная ошибка!', 'Нажмите чтобы скрыть...', {
      timeOut: 4000,
      showProgressBar: true,
      pauseOnHover: true,
      clickToClose: true,
    });
  }

  onInputChange(value) {
    this.httpService.getCityFragment(value).subscribe((response) => {
      this.cities = response['content'];
      this.cities.map((city) => { city.name = `${city.name}, район: ${city.district.name}, область: ${city.district.region.name}`; });
    });
  }

  submit(address: Address) {
    this.isSubmitLoading = true;
    this.httpService.postData(address)
      .subscribe(
        (data: Address) => {
          this.receivedAddress = data;
          this.done = true;
          this.error = undefined;
          this.successEvent();
          this.isSubmitLoading = false;
        },
        error => {
          this.error = error; this.errorEvent();
          this.isSubmitLoading = false;
        }
      );
  }

  showAddCity() {
    if (this.addCityLabel.nativeElement.hidden === true) {
      this.addCityLabel.nativeElement.hidden = false;
      this.showCityAddButton.nativeElement.innerHTML = 'Скрыть добавление населённого пункта';
      if (this.region.nativeElement.options[this.region.nativeElement.selectedIndex] > -1) {
        this.getDistrict();
      } else { this.getDistrictInitialize(); }
    } else {
      this.addCityLabel.nativeElement.hidden = true;
      this.showCityAddButton.nativeElement.innerHTML = 'Добавить населённый пункт';
    }
  }

  getDistrict() {
    const name = this.region.nativeElement.options[this.region.nativeElement.selectedIndex].text;
    let id;
    this.regions.forEach((item) => { if (item.name === name) { id = item.id; }});
    this.http.get(GET_REGION + id, {headers: this.addHeaders(), withCredentials: true})
      .subscribe(data => this.district = data['content']);
  }

  getDistrictInitialize() {
    this.http.get(`${GET_REGION}1`, {headers: this.addHeaders(), withCredentials: true})
      .subscribe(data => this.district = data['content']);
  }

  saveNewCity(newCity: NewCity) {
    if (this.nameCity.nativeElement.value.length > 0) {
      this.address.cityId = {};
      newCity.name = this.typeCity.nativeElement.options[this.typeCity.nativeElement.selectedIndex].text + ' ' +
        this.nameCity.nativeElement.value;
      const name = this.districtCity.nativeElement.options[this.districtCity.nativeElement.selectedIndex].text;
      let id;
      this.district.forEach((item) => { if (item.name === name) { id = item.id; }});
      newCity.districtId = id;
      this.httpService.saveNewCity(newCity)
        .subscribe((city) => {
        this.cities = [];
        this.cities.push(city);
        this.address.cityId = this.cities[0];
        }, error => { this.errorCity = error; console.log(this.errorCity); });
      this.addCityLabel.nativeElement.hidden = true;
      this.showCityAddButton.nativeElement.innerHTML = 'Добавить населённый пункт';
    }
  }

  loadAbiturient() {
    this.isAbiturientLoading = true;
    this.httpService.getAbitur().subscribe(data => {
      this.httpService.userid = data['id'];
      this.tokenInvalid = false;
      this.addressObject = data['addressInfo'];
      if (this.addressObject == null) {
        console.log('set inputs');
      } else {
        this.address.postCode = this.addressObject['postCode'];
        this.address.cityId = this.addressObject['city'];
        this.cities.push(this.address.cityId);
        this.address.street = this.addressObject['street'];
        this.address.house = this.addressObject['house'];
        this.address.building = this.addressObject['building'];
        this.address.appartment = this.addressObject['appartment'];
        this.address.phone = this.addressObject['phone'];
      }
      this.isAbiturientLoading = false;
    }, (error) => {
      if (error.status === 401) {
        this.tokenInvalid = true;
      }
      this.isAbiturientLoading = false;
    });
  }

  loadRegion() {
    this.isRegionLoading = true;
    this.httpService.getRegion().subscribe(data => {
      this.regions = data['content'];
      this.isRegionLoading = false;
    }, () => this.isRegionLoading = false);
  }

  ngOnInit() {
    this.isAbiturientLoading = false;
    this.isRegionLoading = false;
    this.tokenInvalid = false;
    this.isSubmitLoading = false;
    this.addCityLabel.nativeElement.hidden = true;
    this.address.cityId = this.cities[0];

    this.loadAbiturient();
    this.loadRegion();
  }

}
