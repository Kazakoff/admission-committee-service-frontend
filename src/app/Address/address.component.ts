import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {Address} from './address';
import {HttpService} from './address.service';
import {City} from './city';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/debounceTime';
import {debounceTime} from 'rxjs/operator/debounceTime';
import {NotificationsService} from 'angular2-notifications';

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
  page = 0;
  error: any;

  constructor(private httpService: HttpService, private httpClient: HttpClient, private _service: NotificationsService) {

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

  getCity() {
    return this.httpClient.get('http://86.57.182.101:8005/city/contains?fragment=&size=40&page=' + this.page,
      {headers: this.addHeaders(), withCredentials: true});
  }

  getCityFragment(value) {
      return this.httpClient.get('http://86.57.182.101:8005/city/contains?fragment=' + value + '&size=40',
        {headers: this.addHeaders(), withCredentials: true});
  }

  onInputChange(value) {
    this.getCityFragment(value).subscribe((response) => {
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

  ngOnInit() {
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
    this.getCity().subscribe((response) => {
      const hi = response['content'];
      this.cities.push(hi);
      });
    console.log(this.cities);
  }

}
