import {Component, ElementRef, EventEmitter, OnInit, ViewChild} from '@angular/core';
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
  competitionDoc: Certificates[];
  competitionId: number[];
  closeBtnName: string;
  constructor(protected httpService: HttpService, private _modalService: BsModalService) {}

  openModalWithComponent() {
    this._bsModalRef = this._modalService.show(ModalContentComponent);
    this._bsModalRef.content.saved.take(1).subscribe(this.addNewDocument.bind(this));
  }

  openPrivillegeModal() {
    this._bsModalRef = this._modalService.show(PrivillegeModalComponent);
    this._bsModalRef.content.payloadPrivillege.take(1).subscribe(this.addNewPrivillege.bind(this));
  }

  addNewDocument(someData) {
    this.competitionInfo.documents.push(someData);
    console.log(this.competitionInfo);
    this._bsModalRef.hide();
  }

  addNewPrivillege(someData) {
    this.competitionInfo.privilleges.push(someData);
    console.log(this.competitionInfo);
    this._bsModalRef.hide();
  }

  submit(competitionInfo: CompetitionInfo) {
    this.httpService.postData(competitionInfo)
      .subscribe(
        (data: CompetitionInfo) => {
          this.error = undefined;
        },
        error => { this.error = error; }
      );
  }

  ngOnInit() {
    this.httpService.getAbitur().subscribe(data => {
      this.httpService.userid = data['id'];
      this.competitionObject = data['competitionInfo'];
      this.competitionDoc = this.competitionObject['documents'];
      if (this.competitionObject == null) {
        console.log('Set inputs');
      } else {
        this.competitionObject['privilleges'].forEach((item, i) => {
          this.competitionInfo.privilleges.push(item.id); });
        this.competitionDoc.forEach((items, j) => {
          this.competitionInfo.documents.push(items);
        });
      }
      console.log(this.competitionInfo);
    });
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

  @ViewChild('one')
  oneMark: ElementRef;

  @ViewChild('two')
  twoMark: ElementRef;

  @ViewChild('three')
  threeMark: ElementRef;

  @ViewChild('four')
  fourMark: ElementRef;

  @ViewChild('five')
  fiveMark: ElementRef;

  @ViewChild('six')
  sixMark: ElementRef;

  @ViewChild('seven')
  sevenMark: ElementRef;

  @ViewChild('eight')
  eightMark: ElementRef;

  @ViewChild('nine')
  nineMark: ElementRef;

  @ViewChild('ten')
  tenMark: ElementRef;

  constructor(protected httpService: HttpService, public _bsModalRef: BsModalRef) { }

  push() {
    this.certificate.marks = [];
    this.certificate.marks.push(Number(this.oneMark.nativeElement.value));
    this.certificate.marks.push(Number(this.twoMark.nativeElement.value));
    this.certificate.marks.push(Number(this.threeMark.nativeElement.value));
    this.certificate.marks.push(Number(this.fourMark.nativeElement.value));
    this.certificate.marks.push(Number(this.fiveMark.nativeElement.value));
    this.certificate.marks.push(Number(this.sixMark.nativeElement.value));
    this.certificate.marks.push(Number(this.sevenMark.nativeElement.value));
    this.certificate.marks.push(Number(this.eightMark.nativeElement.value));
    this.certificate.marks.push(Number(this.nineMark.nativeElement.value));
    this.certificate.marks.push(Number(this.tenMark.nativeElement.value));
    this.saved.emit(this.certificate);
  }

  ngOnInit() {
    this.httpService.getEdDocType().subscribe(data => this.edDocTypes = data['content']);
    this.httpService.getSubject().subscribe(data => this.subjects = data['content']);
  }

}

@Component({
  selector: 'modal-privillege-content',
  templateUrl: './privillege-content.html',
  providers: [HttpService]
})

export class PrivillegeModalComponent implements OnInit {
  payloadPrivillege: EventEmitter<any> = new EventEmitter();
  token = JSON.parse(localStorage.getItem('token'));
  privillege: Privillege = new Privillege();
  privilleges: Privillege[] = [];

  constructor(protected httpService: HttpService, public _bsModalRef: BsModalRef) { }

  push() {
    this.payloadPrivillege.emit(this.privillege.id);
  }

  ngOnInit() {
    this.httpService.getPrivilleges().subscribe(data => this.privilleges = data['content']);
  }
}
