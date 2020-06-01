import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { CompetitionInfo } from "./competitionInfo";
import { Eddoctype } from "./eddoctype";
import { Subject } from "./subject";
import { HttpService } from "./certificates.service";
import { Certificates } from "./certificates";
import { BsModalService } from "ngx-bootstrap/modal";
import { BsModalRef } from "ngx-bootstrap/modal/bs-modal-ref.service";

import { Faculty } from "./faculty";
import { NotifierService } from "angular-notifier";
import { Router } from "@angular/router";
export { Observable } from "rxjs/Observable";
import { AppDataService } from "../app.data.service";

@Component({
  selector: "cer",
  templateUrl: "./certificates.component.html",
  styleUrls: ["./certificates.component.css"],
  providers: [HttpService],
})
export class CertificatesComponent implements OnInit {
  _bsModalRef: BsModalRef;
  token = JSON.parse(localStorage.getItem("token"));
  competitionInfo: CompetitionInfo = new CompetitionInfo();
  competitionObject: CompetitionInfo[] = [];
  edDocTypes: Eddoctype[] = [];
  subjects: Subject[] = [];
  scales: object[] = [
    { name: "10-бальная", id: "TEN_POINT" },
    { name: "5-бальная", id: "FIVE_POINT" },
  ];
  error: any;
  competitionDoc: Certificates[];
  educationTimes: any[] = [
    { name: "Полный срок получения образования", id: "FULL_TIME" },
    { name: "Сокращенный срок получения образования", id: "REDUCED_TIME" },
  ];
  educationForms: any[] = [
    { name: "Дневная форма получения образования", id: "FULL_TIME_FORM" },
    { name: "Заочная форма получения образования", id: "PART_TIME_FORM" },
  ];
  faculties: Faculty[] = [];
  specialities: any[] = [];
  specialitiesGroups: any[] = [];
  specialitiesEquals: boolean;
  tokenInvalid: boolean;
  isAnySpeciality: boolean;
  isAbiturientLoading: boolean;
  isEdDocTypeLoading: boolean;
  isSubjectLoading: boolean;
  isFacultiesLoading: boolean;

  @ViewChild("educationTime")
  educationTime: ElementRef;

  @ViewChild("educationForm")
  educationForm: ElementRef;

  @ViewChild("facultyId")
  facultyId: ElementRef;

  @ViewChild("speciality")
  speciality: ElementRef;

  constructor(
    protected httpService: HttpService,
    private _modalService: BsModalService,
    private _service: NotifierService,
    private router: Router,
    private appData: AppDataService
  ) {}

  openModalWithComponent() {
    const initialState = this.competitionInfo;
    this._bsModalRef = this._modalService.show(
      ModalContentComponent,
      Object.assign({}, { initialState })
    );
  }

  successEvent() {
    this._service.notify("success", "Форма отправлена успешно!");
  }

  errorEvent() {
    this._service.notify(
      "error",
      'Нельзя добавлять специальности из разных групп специальности либо более одной специальности с группой "Без группы"!'
    );
  }

  SpecialititesSameEvent() {
    this._service.notify(
      "error",
      "Нельзя добавлять несколько одинаковых специальностей!"
    );
  }

  getSpecialities() {
    if (
      !this.educationTime.nativeElement.options[
        this.educationTime.nativeElement.selectedIndex
      ]
    ) {
      return;
    }

    const educationTimeName = this.educationTime.nativeElement.options[
      this.educationTime.nativeElement.selectedIndex
    ].text;
    let educationTimeId;

    this.educationTimes.forEach((item) => {
      if (item.name === educationTimeName) {
        educationTimeId = item.id;
      }
    });

    if (
      !this.educationForm.nativeElement.options[
        this.educationForm.nativeElement.selectedIndex
      ]
    ) {
      return;
    }

    const educationFormName = this.educationForm.nativeElement.options[
      this.educationForm.nativeElement.selectedIndex
    ].text;
    let educationFormId;

    this.educationForms.forEach((item) => {
      if (item.name === educationFormName) {
        educationFormId = item.id;
      }
    });

    if (
      !this.facultyId.nativeElement.options[
        this.facultyId.nativeElement.selectedIndex
      ]
    ) {
      return;
    }

    const facultyIdName = this.facultyId.nativeElement.options[
      this.facultyId.nativeElement.selectedIndex
    ].text;
    let facultyIdId;

    this.faculties.forEach((item) => {
      if (item.name === facultyIdName) {
        facultyIdId = item.id;
      }
    });

    this.httpService
      .getSpeciality(educationTimeId, educationFormId, facultyIdId)
      .subscribe((data) => (this.specialities = <any[]>data));
  }

  addSpeciality() {
    if (this.speciality.nativeElement.selectedIndex !== -1) {
      const specialityName = this.speciality.nativeElement.options[
        this.speciality.nativeElement.selectedIndex
      ].text;
      const speciality = { name: "", group: "" };

      this.specialities.forEach((item) => {
        if (item.name === specialityName.replace(/\s\(([^)]+)\)$/, "")) {
          speciality.name = item.name;
          speciality.group = item.group.name;
          if (
            !this.competitionInfo.specialities.includes(item.id) &&
            !this.specialitiesGroups.some((v) => v.group === "Без группы")
          ) {
            this.competitionInfo.specialities.push(item.id);
            this.specialitiesGroups.push(speciality);
          }
        }
      });
      this.specialitiesEquals =
        this.specialitiesGroups.every(
          (v, i, arr) => v.group === arr[0].group
        ) === true;
      if (this.specialitiesEquals === false) {
        this.errorEvent();
      }
      this.isAnySpeciality = true;
    }
  }

  getDocTypeName(id) {
    const docType = this.edDocTypes.find((item) => item.id === id);

    if (!docType) {
      return;
    }

    return docType.name;
  }

  getSubjectName(id) {
    const subject = this.subjects.find((item) => item.id === id);

    if (!subject) {
      return;
    }

    return subject.name;
  }

  addNewDocument(someData) {
    this.competitionInfo.documents.push(someData);
    this._bsModalRef.hide();
  }

  submit(competitionInfo: CompetitionInfo, nextLink: string) {
    if (this.appData.approve) {
      location.replace(nextLink);
      return;
    }
    if (competitionInfo.specialities.length > 0) {
      this.httpService.postData(competitionInfo).subscribe(
        (data: CompetitionInfo) => {
          this.error = undefined;
          this.successEvent();
          // this.router.navigate(["/"]);
          this.isAnySpeciality = true;
          location.replace(nextLink);
        },
        (error) => {
          this.error = error;
          if (
            confirm(
              "Форма содержит недопустимые значени. Переход на другую страницу не сохранит данные на форме. Вы хотите покинуть страницу?"
            )
          )
            this.isAnySpeciality = false;
          location.replace(nextLink);
        }
      );
    } else {
      this.isAnySpeciality = false;
    }
  }

  convertDocumentObject(inputDocumentObject) {
    const certificate = new Certificates();
    certificate.educationDocumentTypeId =
      inputDocumentObject.educationDocumentType.id;
    if (inputDocumentObject.subject === null) {
      certificate.subjectId = null;
    } else {
      certificate.subjectId = inputDocumentObject.subject.id;
    }
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
    this.specialitiesEquals =
      this.specialitiesGroups.every((v, i, arr) => v.group === arr[0].group) ===
      true;
  }

  loadAbiturient() {
    this.isAbiturientLoading = true;
    this.httpService.getAbitur().subscribe(
      (data) => {
        this.httpService.userid = data["id"];
        this.tokenInvalid = false;
        this.competitionObject = data["competitionInfo"] || {
          documents: [],
          specialities: [],
        };
        this.competitionDoc = this.competitionObject["documents"];
        if (this.competitionObject == null) {
        } else {
          if (this.competitionObject["documents"]) {
            this.competitionObject["documents"].forEach((items, j) => {
              this.competitionInfo.documents.push(
                this.convertDocumentObject(items)
              );
            });
          }
          if (this.competitionObject["specialities"]) {
            this.competitionObject["specialities"].forEach((item, i) => {
              this.competitionInfo.specialities.push(item.id);
              this.specialitiesGroups.push({
                name: item.name,
                group: item.group.name,
              });
            });
          }
        }
        this.isAbiturientLoading = false;
      },
      (error) => {
        if (error.status === 401) {
          this.tokenInvalid = true;
        }
        this.isAbiturientLoading = false;
      }
    );
  }

  loadEdDocType() {
    this.isEdDocTypeLoading = true;
    this.httpService.getEdDocType().subscribe(
      (data) => {
        this.edDocTypes = data["content"];
        this.isEdDocTypeLoading = false;
      },
      () => (this.isEdDocTypeLoading = false)
    );
  }

  loadSubject() {
    this.isSubjectLoading = true;
    this.httpService.getSubject().subscribe(
      (data) => {
        this.subjects = data["content"];
        this.isSubjectLoading = false;
      },
      () => (this.isSubjectLoading = false)
    );
  }

  loadFaculties() {
    this.isFacultiesLoading = true;
    this.httpService.getFaculties().subscribe(
      (data) => {
        this.faculties = data["content"];
        this.isFacultiesLoading = false;
      },
      () => (this.isFacultiesLoading = false)
    );
  }

  ngOnInit() {
    this.isAbiturientLoading = false;
    this.isEdDocTypeLoading = false;
    this.isSubjectLoading = false;
    this.isFacultiesLoading = false;
    this.isAnySpeciality = true;
    this.specialitiesEquals = true;
    this.loadAbiturient();
    this.loadEdDocType();
    this.loadSubject();
    this.loadFaculties();
    setTimeout(() => this.getSpecialities(), 1000);
  }
}

@Component({
  selector: "modal-content",
  styles: [
    `
      input.ng-touched.ng-invalid {
        border: solid red 2px;
      }

      input.ng-touched.ng-valid {
        border: solid green 2px;
      }
    `,
  ],
  templateUrl: "./modal.content.html",
  providers: [HttpService],
})
export class ModalContentComponent implements OnInit {
  token = JSON.parse(localStorage.getItem("token"));
  certificate: Certificates = new Certificates();
  edDocTypes: Eddoctype[] = [];
  subjects: Subject[] = [];
  scales: object[] = [
    { name: "10-бальная", id: "TEN_POINT" },
    { name: "5-бальная", id: "FIVE_POINT" },
  ];
  scaleError: boolean;
  educationDocumentError: boolean;
  subjectError: boolean;

  @Input() documents = [];

  @ViewChild("one")
  oneMark: ElementRef;

  @ViewChild("two")
  twoMark: ElementRef;

  @ViewChild("three")
  threeMark: ElementRef;

  @ViewChild("four")
  fourMark: ElementRef;

  @ViewChild("five")
  fiveMark: ElementRef;

  @ViewChild("six")
  sixMark: ElementRef;

  @ViewChild("seven")
  sevenMark: ElementRef;

  @ViewChild("eight")
  eightMark: ElementRef;

  @ViewChild("nine")
  nineMark: ElementRef;

  @ViewChild("ten")
  tenMark: ElementRef;

  @ViewChild("subjectId")
  subjectId: ElementRef;

  @ViewChild("educationDocumentTypeId")
  educationDocumentTypeId: ElementRef;

  @ViewChild("scale")
  scale: ElementRef;

  @ViewChild("pushButton")
  pushButton: ElementRef;

  constructor(
    protected httpService: HttpService,
    public _bsModalRef: BsModalRef,
    private _service: NotifierService
  ) {}

  oneEducationChange(event) {
    const docType = this.edDocTypes.find(
      (item) => item.id === +event.target.value.charAt(0)
    );

    if (docType.name === "Экзамен" || docType.name === "Сертификат ЦТ") {
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

    if (docType.name !== "Экзамен" && docType.name !== "Сертификат") {
      this.subjectId.nativeElement.selectedIndex = -1;
      this.certificate.subjectId = null;
    }
  }

  isNotExamOrCertificate() {
    const docType = this.edDocTypes.find(
      (item) => item.id === this.certificate.educationDocumentTypeId
    );

    if (!docType) {
      return;
    }

    return docType.name !== "Экзамен" && docType.name !== "Сертификат ЦТ";
  }

  isExam() {
    const docType = this.edDocTypes.find(
      (item) => item.id === this.certificate.educationDocumentTypeId
    );

    if (!docType) {
      return;
    }

    return docType.name === "Экзамен";
  }

  successEvent() {
    this._service.notify("success", "Документ добавлен успешно!");
  }

  errorEvent() {
    this._service.notify("error", "Неожиданная ошибка!");
  }

  push() {
    this.certificate.marks = [];
    this.certificate.marks.push(Number(this.oneMark.nativeElement.value));

    if (this.isNotExamOrCertificate()) {
      this.certificate.marks.push(Number(this.twoMark.nativeElement.value));
      this.certificate.marks.push(Number(this.threeMark.nativeElement.value));
      this.certificate.marks.push(Number(this.fourMark.nativeElement.value));
      this.certificate.marks.push(Number(this.fiveMark.nativeElement.value));
      this.certificate.marks.push(Number(this.sixMark.nativeElement.value));
      this.certificate.marks.push(Number(this.sevenMark.nativeElement.value));
      this.certificate.marks.push(Number(this.eightMark.nativeElement.value));
      this.certificate.marks.push(Number(this.nineMark.nativeElement.value));
      this.certificate.marks.push(Number(this.tenMark.nativeElement.value));
    }

    if (this.subjectId.nativeElement.selectedIndex === -1) {
      this.certificate.subjectId = null;
    }

    if (this.educationDocumentTypeId.nativeElement.selectedIndex === -1) {
      this.certificate.educationDocumentTypeId = null;
    }

    if (
      this.isNotExamOrCertificate() &&
      this.scale.nativeElement.selectedIndex === -1
    ) {
      this.scaleError = true;
      this.errorEvent();
    } else if (
      this.educationDocumentTypeId.nativeElement.selectedIndex === -1
    ) {
      this.educationDocumentError = true;
      this.errorEvent();
    } else if (
      !this.isNotExamOrCertificate() &&
      this.subjectId.nativeElement.selectedIndex === -1
    ) {
      this.subjectError = true;
      this.errorEvent();
    } else {
      this.documents.push(this.certificate);
      this._bsModalRef.hide();
      this.successEvent();
    }
  }

  ngOnInit() {
    this.subjectError = false;
    this.scaleError = false;
    this.educationDocumentError = false;
    this.httpService
      .getEdDocType()
      .subscribe((data) => (this.edDocTypes = data["content"]));
    this.httpService
      .getSubject()
      .subscribe((data) => (this.subjects = data["content"]));
  }
}
