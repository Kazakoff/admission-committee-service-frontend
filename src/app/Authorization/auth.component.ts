import { Component, OnInit } from "@angular/core";
import { Auth } from "./auth";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { environment } from "../../environments/environment";

import { NotifierService } from "angular-notifier";
import { GENERATE_TOKEN } from "../URLS";

@Component({
  selector: "auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.css"],
})
export class AuthComponent implements OnInit {
  constructor(private http: HttpClient, private _service: NotifierService) {}
  auth: Auth = new Auth();
  error: number;
  token: any;

  addHeaders() {
    return new HttpHeaders()
      .set("Authorization", "Basic QURNSVNTSU9OX0NMSUVOVDpoMnUkTVRONVcm")
      .set("Content-Type", "application/json");
  }

  addParams() {
    return new HttpParams()
      .set("grant_type", "password")
      .set("username", this.auth.email)
      .set("password", this.auth.password);
  }

  successEvent() {
    this._service.notify("success", "Добро пожаловать в приёмную комиссию");
  }

  errorEvent() {
    this._service.notify("error", "Ошибка авторизации!");
  }

  submit() {
    this.http
      .post(
        GENERATE_TOKEN,
        {},
        {
          headers: this.addHeaders(),
          withCredentials: true,
          params: this.addParams(),
        }
      )
      .subscribe(
        (data) => {
          this.token = data["access_token"];
          localStorage.setItem("token", JSON.stringify(this.token));
          this.error = undefined;
          this.successEvent();
          location.replace(environment.authRedirectURL);
        },
        (error) => {
          this.error = error;
          this.errorEvent();
        }
      );
  }

  ngOnInit() {}
}
