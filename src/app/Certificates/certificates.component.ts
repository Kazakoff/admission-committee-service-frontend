import {Component, ElementRef, EventEmitter, OnInit, ViewChild} from '@angular/core';
import {CompetitionInfo} from './competitionInfo';
import {Eddoctype} from './eddoctype';
import {Subject} from './subject';
import {HttpService} from './certificates.service';
import {Certificates} from './certificates';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import 'rxjs/add/operator/take';
import {Faculty} from './faculty';
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
  competitionInfo: CompetitionInfo = new CompetitionInfo();
  competitionObject: CompetitionInfo[] = [];
  edDocTypes: Eddoctype[] = [];
  subjects: Subject[] = [];
  scales: object[] = [{name: '10-бальная', id: 'TEN_POINT'}, {name: '5-бальная', id: 'FIVE_POINT'}];
  error: any;
  competitionDoc: Certificates[];
  educationTimes: any[] = [{name: 'Полный срок получения образования', id: 'FULL_TIME'},
    {name: 'Сокращенный срок получения образования', id: 'REDUCED_TIME'}];
  educationForms: any[] = [{name: 'Дневная форма получения образования', id: 'FULL_TIME_FORM'},
    {name: 'Заочная форма получения образования', id: 'PART_TIME_FORM'}];
  faculties: Faculty[] = [];
  specialities: any[] = [];
  specialitiesGroups: any[] = [];

  @ViewChild('educationTime')
  educationTime: ElementRef;

  @ViewChild('educationForm')
  educationForm: ElementRef;

  @ViewChild('facultyId')
  facultyId: ElementRef;

  @ViewChild('speciality')
  speciality: ElementRef;

  constructor(protected httpService: HttpService, private _modalService: BsModalService) {}

  openModalWithComponent() {
    this._bsModalRef = this._modalService.show(ModalContentComponent);
    this._bsModalRef.content.saved.take(1).subscribe(this.addNewDocument.bind(this));
  }

  getSpecialities() {
    const educationTimeName = this.educationTime.nativeElement.options[this.educationTime.nativeElement.selectedIndex].text;
    let educationTimeId;
    this.educationTimes.forEach((item) => { if (item.name === educationTimeName) { educationTimeId = item.id; }});
    const educationFormName = this.educationForm.nativeElement.options[this.educationForm.nativeElement.selectedIndex].text;
    let educationFormId;
    this.educationForms.forEach((item) => { if (item.name === educationFormName) { educationFormId = item.id; }});
    const facultyIdName = this.facultyId.nativeElement.options[this.facultyId.nativeElement.selectedIndex].text;
    let facultyIdId;
    this.faculties.forEach((item) => { if (item.name === facultyIdName) { facultyIdId = item.id; }});

    this.httpService.getSpeciality(educationTimeId, educationFormId, facultyIdId).subscribe(data => this.specialities = <any[]>data);
  }

  addSpeciality() {
    const specialityName = this.speciality.nativeElement.options[this.speciality.nativeElement.selectedIndex].text;
    const speciality = {name: '', group: ''};
    this.specialities.forEach((item) => {
      if (item.name === specialityName) {
        speciality.name = item.name; speciality.group = item.group.name; this.competitionInfo.specialities.push(item.id);
      }
    });
    this.specialitiesGroups.push(speciality);
    console.log(this.specialitiesGroups);
  }

  addNewDocument(someData) {
    this.competitionInfo.documents.push(someData);
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

  convertDocumentObject(inputDocumentObject) {
    const certificate = new Certificates();
    certificate.educationDocumentTypeId = inputDocumentObject.educationDocumentType.id;
    if (inputDocumentObject.subject === null) {
      certificate.subjectId = null;
    } else {
    certificate.subjectId = inputDocumentObject.subject.id; }
    certificate.scale = inputDocumentObject.scale;
    certificate.seria = inputDocumentObject.seria;
    certificate.nameUO = inputDocumentObject.nameUO;
    certificate.number = inputDocumentObject.number;
    certificate.marks = inputDocumentObject.marks;
    return certificate;
  }

  removeDocument(event) {
    this.competitionInfo.documents.forEach((item, i, array) => {
      if (i === event.target.parentElement.parentElement.rowIndex - 1) {
      array.splice(i, 1);
      }
    });
    console.log(this.competitionInfo);
  }

  removeSpeciality(event) {
    this.competitionInfo.specialities.forEach((item, i, array) => {
      if (i === event.target.parentElement.parentElement.rowIndex - 1) {
        array.splice(i, 1);
      }
    });
    this.specialitiesGroups.forEach((item, i, array) => {
      if (i === event.target.parentElement.parentElement.rowIndex - 1) {
        array.splice(i, 1);
      }
    });
    console.log(this.competitionInfo);
  }

  ngOnInit() {
    this.httpService.getAbitur().subscribe(data => {
      this.httpService.userid = data['id'];
      this.competitionObject = data['competitionInfo'];
      this.competitionDoc = this.competitionObject['documents'];
      if (this.competitionObject == null) {
      } else {
        this.competitionObject['documents'].forEach((items, j) => {
          this.competitionInfo.documents.push(this.convertDocumentObject(items));
        });
        this.competitionObject['specialities'].forEach((item, i) => {
          this.competitionInfo.specialities.push(item.id);
          this.specialitiesGroups.push({name: item.name, group: item.group.name});
        });
      }
      console.log(this.competitionInfo);
    });
    this.httpService.getEdDocType().subscribe(data => this.edDocTypes = data['content']);
    this.httpService.getSubject().subscribe(data => this.subjects = data['content']);
    this.httpService.getFaculties().subscribe(data => this.faculties = data['content']);
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
  scales: object[] = [{name: '10-бальная', id: 'TEN_POINT'}, {name: '5-бальная', id: 'FIVE_POINT'}];

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

  @ViewChild('subjectId')
  subjectId: ElementRef;

  @ViewChild('educationDocumentTypeId')
  educationDocumentTypeId: ElementRef;

  constructor(protected httpService: HttpService, public _bsModalRef: BsModalRef) { }

  push() {
    this.certificate.marks = [];
    this.certificate.marks.push(Number(this.oneMark.nativeElement.value));

    if (this.educationDocumentTypeId.nativeElement.selectedIndex !== 4) {
    this.certificate.marks.push(Number(this.twoMark.nativeElement.value));
    this.certificate.marks.push(Number(this.threeMark.nativeElement.value));
    this.certificate.marks.push(Number(this.fourMark.nativeElement.value));
    this.certificate.marks.push(Number(this.fiveMark.nativeElement.value));
    this.certificate.marks.push(Number(this.sixMark.nativeElement.value));
    this.certificate.marks.push(Number(this.sevenMark.nativeElement.value));
    this.certificate.marks.push(Number(this.eightMark.nativeElement.value));
    this.certificate.marks.push(Number(this.nineMark.nativeElement.value));
    this.certificate.marks.push(Number(this.tenMark.nativeElement.value)); }

    if (this.subjectId.nativeElement.selectedIndex === -1) {
      this.certificate.subjectId = null;
    }

    this.saved.emit(this.certificate);
  }

  ngOnInit() {
    this.httpService.getEdDocType().subscribe(data => this.edDocTypes = data['content']);
    this.httpService.getSubject().subscribe(data => this.subjects = data['content']);
  }

}

