import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {PersonalInfoComponent} from './PersonalInformation/personal.info.component';
import {AddressComponent} from './Address/address.component';
import {StudyComponent} from './Study/study.component';
import {AuthComponent} from './Authorization/auth.component';
import {RegistrationComponent} from './Registration/registration.component';
import {AdditionalComponent} from './Additional/additional.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DatePipe} from '@angular/common';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxSelectModule } from 'ngx-select-ex';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CertificatesComponent, ModalContentComponent, PrivillegeModalComponent} from './Certificates/certificates.component';
import {MyFilterPipe} from './Certificates/MyFilterPipe';
import { ModalModule } from 'ngx-bootstrap';

const appRoutes: Routes = [
  {path: 'personal', component: PersonalInfoComponent},
  {path: 'address', component: AddressComponent},
  {path: 'study', component: StudyComponent},
  {path: 'auth', component: AuthComponent},
  {path: 'reg', component: RegistrationComponent},
  {path: 'additional', component: AdditionalComponent},
  {path: 'cer', component: CertificatesComponent},
  {path: '**', redirectTo: '/'}
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
    PrivillegeModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    InfiniteScrollModule,
    NgSelectModule,
    NgxSelectModule,
    SimpleNotificationsModule.forRoot(),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ModalModule.forRoot()
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
  entryComponents: [ModalContentComponent, PrivillegeModalComponent]
})
export class AppModule {
}

