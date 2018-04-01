import {Component, OnInit} from '@angular/core';
import {Address} from './address';
import {HttpService} from './address.service';
import {City} from './city';

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
  providers: [HttpService]
})
export class AddressComponent implements OnInit {

  done = false;
  address: Address = new Address();
  addressObject: Address[] = [];
  addressEdited: Address;
  receivedAddress: Address;
  city: City[] = [{
    id: 1, name: ''
  }];

  constructor(private httpService: HttpService) {
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
      this.address.street = this.addressEdited['street'];
      this.address.home = this.addressEdited['home'];
      this.address.building = this.addressEdited['building'];
      this.address.appartment = this.addressEdited['appartment'];
      this.address.phone = this.addressEdited['phone'];
    }
    this.httpService.getAbitur().subscribe(data => this.httpService.userid = data['id']);
    this.httpService.getCity().subscribe(data => this.city = data['content']);
  }

}
