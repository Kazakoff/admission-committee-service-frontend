import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Role} from './role';
import {Registration} from './registration';
import {HttpService} from './registration.service';
import { NotificationsService } from 'angular2-notifications';
import {timeout} from 'rxjs/operators';

@Component({
  selector: 'reg',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  providers: [HttpService]
})
export class RegistrationComponent implements OnInit {
  error: number;
  recoverError: number;
  constructor(private httpService: HttpService, private _service: NotificationsService) {
  }
  registration: Registration = new Registration();
  roles: any = [{id: 3, name: ''}];

  successEvent() {
    this._service.info('Registration nearly finish! Now check your e-mail and activate account!', 'Click to undo...', {
      timeOut: 4000,
      showProgressBar: true,
      pauseOnHover: true,
      clickToClose: true
    });
  }

  errorEvent() {
    this._service.error('Registration error! Please, try again!', 'Click to undo...', {
      timeOut: 4000,
      showProgressBar: true,
      pauseOnHover: true,
      clickToClose: true
    });
    console.log('hi');
  }

  submit(registration: Registration) {
    this.httpService.postData(registration)
      .subscribe(
        (data: Registration) => { this.error = undefined;
        },
        error => { this.recoverError = error; this.error = error;  }
      );
    setTimeout(() => { if (this.recoverError === undefined) {
      this.successEvent(); } else { this.errorEvent(); this.recoverError = undefined; } }, 1000);
  }

  ngOnInit() {
    this.registration.roleId = this.roles[0];
    this.httpService.getRoles().subscribe(data => this.roles = data);
  }
}
