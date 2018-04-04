import {Component, OnInit} from '@angular/core';
import {Role} from './role';
import {Registration} from './registration';
import {HttpService} from './registration.service';

@Component({
  selector: 'reg',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  providers: [HttpService]
})
export class RegistrationComponent implements OnInit {
  error: number;
  constructor(private httpService: HttpService) {
  }
  registration: Registration = new Registration();
  roles: any = [{id: 3, name: ''}];

  submit(registration: Registration) {
    this.httpService.postData(registration)
      .subscribe(
        (data: Registration) => { location.replace('/');
        },
        error => { this.error = error; }
      );
  }

  ngOnInit() {
    this.registration.roleId = this.roles[0];
    this.httpService.getRoles().subscribe(data => this.roles = data);
  }
}
