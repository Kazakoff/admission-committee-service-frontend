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
import {NotificationsService} from 'angular2-notifications';
import {Router} from '@angular/router';
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
  specialitiesEquals: boolean;
  tokenInvalid: boolean;
  isAnySpeciality: boolean;

  @ViewChild('educationTime')
  educationTime: ElementRef;

  @ViewChild('educationForm')
  educationForm: ElementRef;

  @ViewChild('facultyId')
  facultyId: ElementRef;

  @ViewChild('speciality')
  speciality: ElementRef;

  constructor(protected httpService: HttpService, private _modalService: BsModalService, private _service: NotificationsService, private router: Router) {}

  openModalWithComponent() {
    this._bsModalRef = this._modalService.show(ModalContentComponent);
    this._bsModalRef.content.saved.take(1).subscribe(this.addNewDocument.bind(this));
  }

  successEvent() {
    this._service.success('Форма отправлена успешно!', '', {
      timeOut: 4000,
      showProgressBar: true,
      pauseOnHover: true,
      clickToClose: true
    });
  }

  errorEvent() {
    this._service.error('Нельзя добавлять специальности из разных групп специальности!', '', {
      timeOut: 4000,
      showProgressBar: true,
      pauseOnHover: true,
      clickToClose: true,
    });
  }

  SpecialititesSameEvent() {
    this._service.error('Нельзя добавлять несколько одинаковых специальностей!', '', {
      timeOut: 4000,
      showProgressBar: true,
      pauseOnHover: true,
      clickToClose: true,
    });
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
    if (this.speciality.nativeElement.selectedIndex !== -1) {
      const specialityName = this.speciality.nativeElement.options[this.speciality.nativeElement.selectedIndex].text;
      const speciality = {name: '', group: ''};
      this.specialities.forEach((item) => {
        if (item.name === specialityName) {
          speciality.name = item.name;
          speciality.group = item.group.name;
          if (!this.competitionInfo.specialities.includes(item.id)) {
            this.competitionInfo.specialities.push(item.id);
            this.specialitiesGroups.push(speciality);
          }
        }
      });
      this.specialitiesEquals = this.specialitiesGroups.every((v, i, arr) => v.group === arr[0].group) === true;
      if (this.specialitiesEquals === false) {
        this.errorEvent();
      }
      this.isAnySpeciality = true;
    }
  }

  addNewDocument(someData) {
    this.competitionInfo.documents.push(someData);
    console.log(this.competitionInfo);
    this._bsModalRef.hide();
  }

  submit(competitionInfo: CompetitionInfo) {
    if (competitionInfo.specialities.length > 0 ) {
      this.httpService.postData(competitionInfo)
        .subscribe(
          (data: CompetitionInfo) => {
            this.error = undefined;
            this.successEvent();
          },
          error => { this.error = error; }
        );
      this.isAnySpeciality = true;
      this.router.navigate(['/']);
    } else {
      this.isAnySpeciality = false;
    }
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
    this.specialitiesEquals = this.specialitiesGroups.every((v, i, arr) => v.group === arr[0].group) === true;
  }

  ngOnInit() {
    this.isAnySpeciality = true;
    this.specialitiesEquals = true;
    this.httpService.getAbitur().subscribe(data => {
      this.httpService.userid = data['id'];
      this.tokenInvalid = false;
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
    }, (error) => {
      if (error.status === 401) {
        this.tokenInvalid = true;
      }
    });
    this.httpService.getEdDocType().subscribe(data => this.edDocTypes = data['content']);
    this.httpService.getSubject().subscribe(data => this.subjects = data['content']);
    this.httpService.getFaculties().subscribe(data => this.faculties = data['content']);
  }
}

@Component({
  selector: 'modal-content',
  styles: [`
    input.ng-touched.ng-invalid {
      border: solid red 2px;
    }

    input.ng-touched.ng-valid {
      border: solid green 2px;
    }
  `],
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
  scaleError: boolean;
  educationDocumentError: boolean;
  subjectError: boolean;

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

  @ViewChild('scale')
  scale: ElementRef;

  @ViewChild('pushButton')
  pushButton: ElementRef;

  constructor(protected httpService: HttpService, public _bsModalRef: BsModalRef, private _service: NotificationsService) { }

  oneEducationChange() {
    if (this.educationDocumentTypeId.nativeElement.selectedIndex === 5) {
      this.scale.nativeElement.selectedIndex = -1;
      this.oneMark.nativeElement.value = 0;
      this.twoMark.nativeElement.value = 0;
      this.threeMark.nativeElement.value = 0;
      this.fourMark.nativeElement.value = 0;
      this.fiveMark.nativeElement.value = 0;
      this.sixMark.nativeElement.value = 0;
      this.sevenMark.nativeElement.value = 0;
      this.eightMark.nativeElement.value = 0;
      this.nineMark.nativeElement.value = 0;
      this.tenMark.nativeElement.value = 0;
      this.certificate.scale = null;
    }

    if (this.educationDocumentTypeId.nativeElement.selectedIndex !== 5) {
      this.subjectId.nativeElement.selectedIndex = -1;
      this.certificate.subjectId = null;
    }
  }

  successEvent() {
    this._service.success('Документ добавлен успешно!', '', {
      timeOut: 4000,
      showProgressBar: true,
      pauseOnHover: true,
      clickToClose: true
    });
  }

  errorEvent() {
    this._service.error('Неожиданная ошибка!', '', {
      timeOut: 4000,
      showProgressBar: true,
      pauseOnHover: true,
      clickToClose: true,
    });
  }

  push() {

    this.certificate.marks = [];
    this.certificate.marks.push(Number(this.oneMark.nativeElement.value));

    if (this.educationDocumentTypeId.nativeElement.selectedIndex !== 5) {
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

    if (this.educationDocumentTypeId.nativeElement.selectedIndex === -1) {
      this.certificate.educationDocumentTypeId = null;
    }

    if (this.educationDocumentTypeId.nativeElement.selectedIndex !== 5 && this.scale.nativeElement.selectedIndex === -1) {
      this.scaleError = true;
      this.errorEvent();
    } else if (this.educationDocumentTypeId.nativeElement.selectedIndex === -1) {
      this.educationDocumentError = true;
      this.errorEvent();
    } else if (this.educationDocumentTypeId.nativeElement.selectedIndex === 5 && this.subjectId.nativeElement.selectedIndex === -1) {
      this.subjectError = true;
      this.errorEvent();
    } else {
        this.saved.emit(this.certificate);
        this.successEvent();
      }
    }

  ngOnInit() {
    this.subjectError = false;
    this.scaleError = false;
    this.educationDocumentError = false;
    this.httpService.getEdDocType().subscribe(data => this.edDocTypes = data['content']);
    this.httpService.getSubject().subscribe(data => this.subjects = data['content']);
  }

}
