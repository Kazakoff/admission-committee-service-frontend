import { Component, OnInit } from "@angular/core";
import { Personal } from "./personal";
import { HttpService } from "./personal.service";
import { Doctype } from "./doctype";
import { Nationality } from "./nationality";
import { DatePipe } from "@angular/common";
import { NotifierService } from "angular-notifier";
import { BsDatepickerConfig, BsLocaleService } from "ngx-bootstrap/datepicker";
import { defineLocale } from "ngx-bootstrap/chronos";
import { ruLocale } from "ngx-bootstrap/locale";
defineLocale("ru", ruLocale);

@Component({
  selector: "personal",
  templateUrl: "./personal.info.component.html",
  styles: [
    `
      input.ng-touched.ng-invalid {
        border: solid red 2px;
      }

      input.ng-touched.ng-valid {
        border: solid green 2px;
      }

      label.active {
        box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.5);
      }
    `,
  ],
  providers: [HttpService, DatePipe],
})
export class PersonalInfoComponent implements OnInit {
  locale = "ru";
  personal: Personal = new Personal();
  personalObject: Personal[] = [];
  error: any;
  token = JSON.parse(localStorage.getItem("token"));
  receivedPersonal: Personal;
  done = false;
  doctype: Doctype[] = [
    {
      id: 1,
      name: "",
    },
  ];
  nationality: Nationality[] = [
    {
      id: 1,
      name: "",
    },
  ];
  mytime: Date = new Date();
  rightNow: Date = new Date();
  minDate: Date = new Date(1930, 0, 1);
  tokenInvalid: boolean;
  isAbiturientLoading: boolean;
  isDocLoading: boolean;
  isNationalitiesLoading: boolean;
  isSubmitLoading: boolean;

  constructor(
    private httpService: HttpService,
    public datepipe: DatePipe,
    private _service: NotifierService,
    private localeService: BsLocaleService
  ) {
    this.localeService.use(this.locale);
  }

  successEvent() {
    this._service.notify("success", "Форма отправлена успешно!");
  }

  errorEvent() {
    this._service.notify("error", "Неожиданная ошибка!");
  }

  submit(personal: Personal) {
    this.isSubmitLoading = true;
    this.httpService.postData(personal).subscribe(
      (data: Personal) => {
        this.receivedPersonal = data;
        this.done = true;
        this.error = undefined;
        this.successEvent();
        this.isSubmitLoading = false;
      },
      (error) => {
        this.error = error;
        this.errorEvent();
        this.isSubmitLoading = false;
      }
    );
  }

  loadDocTypes() {
    this.isDocLoading = true;
    this.httpService.getDocType().subscribe(
      (data) => {
        this.doctype = data["content"];
        this.isDocLoading = false;
      },
      () => (this.isDocLoading = false)
    );
  }

  loadNatonalities() {
    this.isNationalitiesLoading = true;
    this.httpService.getNationality().subscribe(
      (data) => {
        this.nationality = data["content"];
        this.isNationalitiesLoading = false;
      },
      () => (this.isNationalitiesLoading = false)
    );
  }

  loadAbiturient() {
    this.isAbiturientLoading = true;
    this.httpService.getAbitur().subscribe(
      (data) => {
        this.personalObject = data["profileInfo"];
        if (this.personalObject == null) {
          console.log("Set inputs");
        } else {
          this.personal.documentTypeId = this.personalObject["documentType"];
          this.personal.documentSeria = this.personalObject["documentSeria"];
          this.personal.documentNumber = this.personalObject["documentNumber"];
          this.personal.documentDate = this.datepipe.transform(
            this.personalObject["documentDate"],
            "yyyy-MM-dd"
          );
          this.personal.documentOrgan = this.personalObject["documentOrgan"];
          this.personal.firstName = this.personalObject["firstName"];
          this.personal.lastName = this.personalObject["lastName"];
          // add fields
          this.personal.firstNameEn = this.personalObject["firstNameEn"];
          this.personal.lastNameEn = this.personalObject["lastNameEn"];

          this.personal.middleName = this.personalObject["middleName"];
          this.personal.birthDate = this.datepipe.transform(
            this.personalObject["birthDate"],
            "yyyy-MM-dd"
          );
          this.personal.birthPlace = this.personalObject["birthPlace"];
          this.personal.nationalityId = this.personalObject["nationality"];
          this.personal.identificationNumber = this.personalObject[
            "identificationNumber"
          ];
          this.personal.sex = this.personalObject["sex"];
        }
        this.httpService.userid = data["id"];
        this.tokenInvalid = false;
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

  setSex(sex) {
    this.personal.sex = sex === "man" ? 1 : 2;
  }

  isRadioChecked(sex) {
    switch (sex) {
      case "man":
        return this.personal.sex === 1;
      case "women":
        return this.personal.sex === 2;
    }
  }

  ngOnInit() {
    this.isAbiturientLoading = false;
    this.isDocLoading = false;
    this.isNationalitiesLoading = false;
    this.isSubmitLoading = false;
    this.personal.documentTypeId = this.doctype[0];
    this.personal.nationalityId = this.nationality[0];

    this.loadAbiturient();
    this.loadDocTypes();
    this.loadNatonalities();
  }
}
