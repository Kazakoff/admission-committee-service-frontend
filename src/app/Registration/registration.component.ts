import { Component, OnInit } from '@angular/core';
import { Registration } from './registration';
import { HttpService } from './registration.service';
import { NotifierService } from 'angular-notifier';
import { BsModalService } from "ngx-bootstrap/modal";
import { BsModalRef } from "ngx-bootstrap/modal/bs-modal-ref.service";
import { AgreementComponent } from "./Agreement/agreement.component"

@Component({
  selector: 'reg',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  providers: [HttpService]
})
export class RegistrationComponent implements OnInit {
  captchaResolved = false;
  error: number;
  recoverError: number;
  _bsModalRef: BsModalRef;

  constructor(private httpService: HttpService,
    private _service: NotifierService,
    private _modalService: BsModalService) {
  }
  registration: Registration = new Registration();
  roles: any = [{ id: 3, name: '' }];

  successEvent() {
    this._service.notify('info',
      'Регистрация практически завершена! Сейчас проверьте свой e-mail и подтвердите регистрацию!');
  }

  errorEvent() {
    this._service.notify('error', 'Ошибка регистрации! Пожалуйста, попробуйте ещё раз!');
  }

  openModalWithComponent() {
    this._bsModalRef = this._modalService.show(
      AgreementComponent, { class: 'modal-lg' });
  }

  submit(registration: Registration) {
    this.httpService.postData(registration)
      .subscribe(
        (data: Registration) => {
          this.error = undefined; this.successEvent();
        },
        error => { this.error = error; this.errorEvent(); }
      );
  }

  onCaptchaResolved(token: string) {
    this.captchaResolved = !!token; // Устанавливаем флаг, если токен капчи получен
  }

  ngOnInit() {
    this.httpService.getRoles().subscribe(data => {
      this.roles = data;
      this.registration.roleId = this.roles.find(role => role.name === 'ABITURIENT');
    });
  }
}
