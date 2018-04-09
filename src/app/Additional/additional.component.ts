import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HttpService} from './additional.service';
import {Additional} from './additional';
import {NotificationsService} from 'angular2-notifications';

@Component({
  selector: 'additional',
  templateUrl: './additional.component.html',
  styles: [`
    input.ng-touched.ng-invalid {
      border: solid red 2px;
    }

    input.ng-touched.ng-valid {
      border: solid green 2px;
    }
  `],
  providers: [HttpService]
})

export class AdditionalComponent implements OnInit {

  token = JSON.parse(localStorage.getItem('token'));
  additional: Additional = new Additional();
  additionalEdited: Additional;
  additionalObject: Additional[] = [];
  receivedAdditional: Additional;
  done = false;
  error: any;

  constructor(private httpService: HttpService, private _service: NotificationsService) {
  }

  submit(additional: Additional) {
    this.httpService.postData(additional)
      .subscribe(
        (data: Additional) => {
          this.receivedAdditional = data;
          this.done = true;
          this.error = undefined;
          this.successEvent();
        },
        error => { this.error = error; this.errorEvent(); }
      );
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

  ngOnInit() {

    this.httpService.getAbitur().subscribe(data => {
      this.additionalObject = data['additionalInfo'];
      if (this.additionalObject == null) {
        console.log('set inputs');
      } else {
        this.additional.fatherFIO = this.additionalObject['fatherFIO'];
        this.additional.fatherWork = this.additionalObject['fatherWork'];
        this.additional.fatherPhone = this.additionalObject['fatherPhone'];
        this.additional.motherFIO = this.additionalObject['motherFIO'];
        this.additional.motherWork = this.additionalObject['motherWork'];
        this.additional.motherPhone = this.additionalObject['motherPhone'];
        this.additional.childCount = this.additionalObject['childCount'];
        this.additional.workPlace = this.additionalObject['workPlace'];
        this.additional.experience = this.additionalObject['experience'];
        this.additional.reAdmission = this.additionalObject['reAdmission'];
        this.additional.note = this.additionalObject['note'];
      }
    });
    this.httpService.getAbitur().subscribe(data => this.httpService.userid = data['id']);
  }

}
