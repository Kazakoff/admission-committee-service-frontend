import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { GET_ABITURIENT, GET_STATUS } from "./URLS";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AppDataService } from "./app.data.service";
import { environment } from "../environments/environment";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  approve: boolean;
  userId: number;
  specialities: Object;
  sum: number;
  profileInfo: null | { firstName: null | string; lastName: null | string };
  email: string;

  constructor(
    public router: Router,
    private http: HttpClient,
    private appData: AppDataService
  ) {}

  title = "app";
  token = JSON.parse(localStorage.getItem("token"));
 
  logOut() {
    localStorage.removeItem("token");
    //this.router.navigate(["/"]);
    location.replace(environment.authRedirectURL);
  }

  addHeaders() {
    const myHeaders = new HttpHeaders()
      .set("Authorization", "Bearer " + this.token)
      .set("Content-Type", "application/json");
    return myHeaders;
  }
  submit(nextLink: string) {
    if (this.router.url == '/' || confirm( "Не сохранённые данные будут потеряны. Для сохранения данных нажмите 'Далее'. Вы хотите покинуть страницу?"))
    {
      this.router.navigate([nextLink]);
    }

  }
  ngOnInit() {
    if (this.token) {
      this.http
        .get(GET_ABITURIENT, {
          headers: this.addHeaders(),
          withCredentials: true,
        })
        .subscribe((data) => {
          this.approve = data["profileApproved"];
          this.appData.approve = this.approve;
          this.userId = data["id"];
          this.profileInfo = data["profileInfo"];
          this.email = data["email"];
          if (this.approve) {
            this.http
              .get(GET_STATUS + this.userId + "/status", {
                headers: this.addHeaders(),
                withCredentials: true,
              })
              .subscribe((response) => {
                this.specialities = response["specialities"];
                this.sum = response["sum"];
              });
          }
        });
    }
  }
}
