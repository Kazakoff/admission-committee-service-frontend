import {Component, EventEmitter, OnInit} from '@angular/core';
import {CompetitionInfo} from './competitionInfo';
import {Eddoctype} from './eddoctype';
import {Subject} from './subject';
import {HttpService} from './certificates.service';
import {Privillege} from './privillege';
import {Certificates} from './certificates';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import 'rxjs/add/operator/take';
export { Observable } from 'rxjs/Observable';

@Component({
  selector: 'cer',
  templateUrl: './certificates.component.html',
  styleUrls: ['./certificates.component.css'],
  providers: [HttpService]
})
export class CertificatesComponent implements OnInit {
  _bsModalRef: BsModalRef;
  token = JSON.parse(localStorage.getItem('token'));
  done = false;
  competitionInfo: CompetitionInfo = new CompetitionInfo();
  competitionObject: CompetitionInfo[] = [];
  edDocTypes: Eddoctype[] = [];
  subjects: Subject[] = [];
  privilleges: Privillege[] = [{id: 1, name: '', cipher: '', withoutExam: false, withoutCompetition: false}];
  error: any;
  closeBtnName: string;
  constructor(protected httpService: HttpService, private _modalService: BsModalService) {}

  openModalWithComponent() {
    this._bsModalRef = this._modalService.show(ModalContentComponent);
    this._bsModalRef.content.saved.take(1).subscribe(this.addNewRecord.bind(this));
  }

  addNewRecord(someData) {
    this.competitionInfo.documents.push(someData);
    console.log(this.competitionInfo);
    this._bsModalRef.hide();
  }

  ngOnInit() {
    this.httpService.getEdDocType().subscribe(data => this.edDocTypes = data['content']);
    this.httpService.getSubject().subscribe(data => this.subjects = data['content']);
    this.httpService.getPrivilleges().subscribe(data => this.privilleges = data['content']);
}
}

@Component({
  selector: 'modal-content',
  templateUrl: './modal.content.html',
  providers: [HttpService]
})

export class ModalContentComponent implements OnInit {
  token = JSON.parse(localStorage.getItem('token'));

  certificate: Certificates = new Certificates();
  saved: EventEmitter<any> = new EventEmitter();
  edDocTypes: Eddoctype[] = [];
  subjects: Subject[] = [];

  constructor(protected httpService: HttpService, public _bsModalRef: BsModalRef) { }

  push() {
    this.saved.emit(this.certificate);
  }

  ngOnInit() {
    this.httpService.getEdDocType().subscribe(data => this.edDocTypes = data['content']);
    this.httpService.getSubject().subscribe(data => this.subjects = data['content']);
  }

}
