import { Component, OnInit } from "@angular/core";
import { HttpService } from "./additional.service";
import { Additional } from "./additional";
import { NotifierService } from "angular-notifier";
import { AppDataService } from "../app.data.service";
import { environment } from "../../environments/environment";
import { Router } from "@angular/router";

@Component({
  selector: "additional",
  templateUrl: "./additional.component.html",
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
  providers: [HttpService],
})
export class AdditionalComponent implements OnInit {
  token = JSON.parse(localStorage.getItem("token"));
  additional: Additional = new Additional();
  additionalObject: Additional[] = [];
  receivedAdditional: Additional;
  done = false;
  error: any;
  tokenInvalid: boolean;
  isAbiturientLoading: boolean;
  isSubmitLoading: boolean;

  constructor(
    public router: Router,
    private httpService: HttpService,
    private _service: NotifierService,
    private appData: AppDataService
  ) {}

  submit(additional: Additional, nextLink: string) {
    if (this.appData.approve) {
      this.router.navigate([nextLink]);
      return;
    }
    this.isSubmitLoading = true;
    this.httpService.postData(additional).subscribe(
      (data: Additional) => {
        this.receivedAdditional = data;
        this.done = true;
        this.error = undefined;
        this.successEvent();
        this.isSubmitLoading = false;
        this.router.navigate([nextLink]);
      },
      (error) => {
        this.error = error;
        this.errorEvent();
        this.isSubmitLoading = false;
        if (
          confirm(
            "Форма содержит недопустимые значени. Переход на другую страницу не сохранит данные на форме. Вы хотите покинуть страницу?"
          )
        )
        this.router.navigate([nextLink]);
      }
    );
  }

  successEvent() {
    this._service.notify("success", "Форма отправлена успешно!");
  }

  errorEvent() {
    this._service.notify("error", "Неожиданная ошибка");
  }

  loadAbiturient() {
    this.isAbiturientLoading = true;
    this.httpService.getAbitur().subscribe(
      (data) => {
        this.httpService.userid = data["id"];
        this.tokenInvalid = false;
        this.additionalObject = data["additionalInfo"];
        if (this.additionalObject == null) {
          console.log("set inputs");
        } else {
          this.additional.fatherFIO = this.additionalObject["fatherFIO"];
          this.additional.fatherWork = this.additionalObject["fatherWork"];
          this.additional.fatherPhone = this.additionalObject["fatherPhone"];
          this.additional.motherFIO = this.additionalObject["motherFIO"];
          this.additional.motherWork = this.additionalObject["motherWork"];
          this.additional.motherPhone = this.additionalObject["motherPhone"];
          this.additional.childCount = this.additionalObject["childCount"];
          this.additional.workPlace = this.additionalObject["workPlace"];
          this.additional.experience = this.additionalObject["experience"];
          this.additional.reAdmission = this.additionalObject["reAdmission"];
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
  ngOnInit() {
    this.isAbiturientLoading = false;
    this.isSubmitLoading = false;
    this.loadAbiturient();
  }
}
