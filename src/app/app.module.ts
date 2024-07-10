import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { PersonalInfoComponent } from "./PersonalInformation/personal.info.component";
import { AddressComponent } from "./Address/address.component";
import { StudyComponent } from "./Study/study.component";
import { AuthComponent } from "./Authorization/auth.component";
import { RegistrationComponent } from "./Registration/registration.component";
import { AdditionalComponent } from "./Additional/additional.component";
import { ExitGuard } from "./ExitGuard/exit.guard";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DatePipe } from "@angular/common";
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { NgSelectModule } from "@ng-select/ng-select";
import { NgxSelectModule } from "ngx-select-ex";
import { NotifierModule } from "angular-notifier";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  CertificatesComponent,
  ModalContentComponent,
} from "./Certificates/certificates.component";
import { MyFilterPipe } from "./Certificates/MyFilterPipe";
import { ModalModule, PopoverModule, TooltipModule } from "ngx-bootstrap";
import { DatepickerModule, BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { NgProgressModule } from "@ngx-progressbar/core";
import { NgProgressHttpModule } from "@ngx-progressbar/http";
import { StatisticsComponent } from "./Statistics/statistics.component";
import { AngularFontAwesomeModule } from "angular-font-awesome";
import { AgreementComponent } from "./Registration/Agreement/agreement.component"
import { RecaptchaModule } from 'ng-recaptcha';

const appRoutes: Routes = [
  // {  path: "personal", component: PersonalInfoComponent, canDeactivate: [ExitGuard] },
  { path: "personal", component: PersonalInfoComponent },
  { path: "address", component: AddressComponent },
  { path: "study", component: StudyComponent },
  { path: "auth", component: AuthComponent },
  { path: "reg", component: RegistrationComponent },
  //{ path: "additional", component: AdditionalComponent},
  { path: "cer", component: CertificatesComponent },

  { path: "statistics", component: StatisticsComponent },
  { path: "**", redirectTo: "/" },
];

@NgModule({
  declarations: [
    AppComponent,
    PersonalInfoComponent,
    AddressComponent,
    StudyComponent,
    AuthComponent,
    AdditionalComponent,
    RegistrationComponent,
    CertificatesComponent,
    MyFilterPipe,
    ModalContentComponent,
    StatisticsComponent,
    AgreementComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    InfiniteScrollModule,
    NgSelectModule,
    NgxSelectModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    DatepickerModule.forRoot(),
    TooltipModule.forRoot(),
    NotifierModule,
    NgProgressHttpModule,
    AngularFontAwesomeModule,
    RecaptchaModule,
  ],
  providers: [DatePipe, ExitGuard],
  bootstrap: [AppComponent],
  entryComponents: [ModalContentComponent, AgreementComponent],
})
export class AppModule { }
