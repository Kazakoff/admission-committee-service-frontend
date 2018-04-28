import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {Address} from './address';
import {HttpService} from './address.service';
import {City} from './city';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/debounceTime';
import {debounceTime} from 'rxjs/operator/debounceTime';
import {NotificationsService} from 'angular2-notifications';
import {Region} from './region';
import {District} from './district';
import {NewCity} from './newCity';

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
  cities: City[] = [{id: 1, name: ''}];
  regions: Region[] = [];
  district: District[] = [];
  cityTypes: string[] = ['г. ', 'д. ', 'гп. ', 'с. ', 'аг. ', 'п. ', 'х. '];
  newCity: NewCity = new NewCity();
  page = 0;
  error: any;
  errorCity: any;

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
    this._service.success('Form submitted successfully!', 'Click to undo...', {
      timeOut: 4000,
      showProgressBar: true,
      pauseOnHover: true,
      clickToClose: true
    });
  }

  errorEvent() {
    this._service.error('Unexpected error!', 'Click to undo...', {
      timeOut: 4000,
      showProgressBar: true,
      pauseOnHover: true,
      clickToClose: true,
    });
  }

  onInputChange(value) {
    this.httpService.getCityFragment(value).subscribe((response) => {
      this.cities = response['content'];
    });
  }

  submit(address: Address) {
    this.httpService.postData(address)
      .subscribe(
        (data: Address) => {
          this.receivedAddress = data;
          this.done = true;
          this.error = undefined;
          this.successEvent();
        },
        error => { this.error = error; this.errorEvent(); }
      );
  }

  showAddCity() {
    this.addCityLabel.nativeElement.hidden = false;
  }

  getDistrict() {
    const name = this.region.nativeElement.options[this.region.nativeElement.selectedIndex].text;
    let id;
    this.regions.forEach((item) => { if (item.name === name) { id = item.id; }});
    this.http.get('http://86.57.182.101:8005/district/region/' + id, {headers: this.addHeaders(), withCredentials: true})
      .subscribe(data => this.district = data['content']);
  }

  saveNewCity(newCity: NewCity) {
    newCity.name = this.typeCity.nativeElement.options[this.typeCity.nativeElement.selectedIndex].text + ' ' +
      this.nameCity.nativeElement.value;
    const name = this.districtCity.nativeElement.options[this.districtCity.nativeElement.selectedIndex].text;
    let id;
    this.district.forEach((item) => { if (item.name === name) { id = item.id; }});
    newCity.districtId = id;
    this.httpService.saveNewCity(newCity)
      .subscribe(() => {}, error => { this.errorCity = error; console.log(this.errorCity); });
    this.addCityLabel.nativeElement.hidden = true;
  }

  ngOnInit() {
    this.addCityLabel.nativeElement.hidden = true;
    this.address.cityId = this.cities[0];
    this.httpService.getAbitur().subscribe(data => {
      this.addressObject = data['addressInfo'];
      if (this.addressObject == null) {
        console.log('set inputs');
      } else {
        this.address.postCode = this.addressObject['postCode'];
        this.address.cityId = this.addressObject['city'];
        this.cities.push(this.address.cityId);
        this.address.street = this.addressObject['street'];
        this.address.home = this.addressObject['home'];
        this.address.building = this.addressObject['building'];
        this.address.appartment = this.addressObject['appartment'];
        this.address.phone = this.addressObject['phone'];
      }
    });
    this.httpService.getAbitur().subscribe(data => this.httpService.userid = data['id']);
    this.httpService.getRegion().subscribe(data => this.regions = data['content']);

    console.log(this.cities);
  }

}
