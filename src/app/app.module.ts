import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {PersonalInfoComponent} from './PersonalInformation/personal.info.component';
import {AddressComponent} from './Address/address.component';
import {StudyComponent} from './Study/study.component';
import {AuthComponent} from './Authorization/auth.component';
import {AdditionalComponent} from './Additional/additional.component';
import {FormsModule} from '@angular/forms';

const appRoutes: Routes = [
  {path: 'personal', component: PersonalInfoComponent},
  {path: 'address', component: AddressComponent},
  {path: 'study', component: StudyComponent},
  {path: 'auth', component: AuthComponent},
  {path: 'additional', component: AdditionalComponent},
  {path: '**', redirectTo: '/'}
];

@NgModule({
  declarations: [
    AppComponent,
    PersonalInfoComponent,
    AddressComponent,
    StudyComponent,
    AuthComponent,
    AdditionalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
