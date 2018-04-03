import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {Address} from './address';
import {HttpService} from './address.service';
import {City} from './city';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {debounceTime} from 'rxjs/operators';
import {Router} from '@angular/router';

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

  @ViewChild('scr')
  nameScroll: ElementRef;

  token = JSON.parse(localStorage.getItem('token'));
  done = false;
  address: Address = new Address();
  addressObject: Address[] = [];
  addressEdited: Address;
  receivedAddress: Address;
  city: City[] = [{
    id: 1, name: ''
  }];
  posts: City[] = [];
  page = 0;

  constructor(private httpService: HttpService, private httpClient: HttpClient, private router: Router) {

  }

  addHeaders() {
    const myHeaders = new HttpHeaders()
      .set('Authorization', 'Bearer ' + this.token)
      .set('Content-Type', 'application/json');
    return myHeaders;
  }

  getCity() {
    return this.httpClient.get('http://localhost:8005/city/contains?fragment=&size=40&page=' + this.page,
      {headers: this.addHeaders(), withCredentials: true});
  }

  bigCityLife(value) {
      return this.httpClient.get('http://localhost:8005/city/contains?fragment=' + value + '&size=40',
        {headers: this.addHeaders(), withCredentials: true});
  }

  onInputChange(value) {
    this.bigCityLife(value).subscribe((response) => {
      this.posts = response['content'];
    });
  }

  submit(address: Address) {
    this.httpService.postData(address)
      .subscribe(
        (data: Address) => {
          this.receivedAddress = data;
          this.done = true;
        },
        error => console.log(error)
      );
  }

  ngOnInit() {
    this.address.cityId = this.city[0];

    this.httpService.getAbitur().subscribe(data => {
      this.addressObject = data['addressInfo'];
      localStorage.setItem('address', JSON.stringify(this.addressObject));
    });
    this.addressEdited = JSON.parse(localStorage.getItem('address'));
    if (this.addressEdited == null) {
      console.log('set inputs');
    } else {
      this.address.postCode = this.addressEdited['postCode'];
      this.address.cityId = this.addressEdited['city'];
      this.posts.push(this.address.cityId);
      this.address.street = this.addressEdited['street'];
      this.address.home = this.addressEdited['home'];
      this.address.building = this.addressEdited['building'];
      this.address.appartment = this.addressEdited['appartment'];
      this.address.phone = this.addressEdited['phone'];
    }
    this.httpService.getAbitur().subscribe(data => this.httpService.userid = data['id']);
    this.httpService.getCity().subscribe(data => this.city = data['content']);
    this.getCity().subscribe((response) => {
      const hi = response['content'];
      });
    console.log(this.posts);
  }

}
