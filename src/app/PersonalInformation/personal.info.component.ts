import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Personal} from './personal';
import {HttpService} from './personal.service';
import {Docseria} from './docseria';
import {Doctype} from './doctype';
import {Nationality} from './nationality';
import {timeout} from 'q';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'personal',
  templateUrl: './personal.info.component.html',
  styles: [`
        input.ng-touched.ng-invalid {border:solid red 2px;}
        input.ng-touched.ng-valid {border:solid green 2px;}
    `],
  providers: [HttpService, DatePipe]
})
export class PersonalInfoComponent implements OnInit {
  @ViewChild('personaldocumentOrgan') el: ElementRef;

  personal: Personal = new Personal();
  personalObject: Personal[] = [];
  sex = true;

  receivedPersonal: Personal; // полученный пользователь
  done = false;
  doctype: Doctype[] = [];
  docseria: Docseria[] = [];
  nationality: Nationality[] = [];
  personalEdited: Personal;
  documenttypeEdited: Doctype;
  documentseriaEdited: Docseria;
  documentnumberEdited: string;
  documentdateEdited: Date;
  docorganEdited: string;
  firstnameEdited: string;
  lastnameEdited: string;
  middlenameEdited: string;
  birthdateEdited: Date;
  birthplaceEdited: string;
  nationalityEdited: Nationality;
  identificationnumberEdited: string;
  condition = true;

  constructor(private httpService: HttpService, public datepipe: DatePipe) {
  }

  submit(personal: Personal) {
    this.httpService.postData(personal)
      .subscribe(
        (data: Personal) => {
          this.receivedPersonal = data;
          this.done = true;
        },
        error => console.log(error)
      );
  }

  /*TODO
Загрузить в ngOnInit весь объект и заполнить инпуты полями
   */


  ngOnInit() {
    this.httpService.getAbitur().subscribe(data => {
      this.personalObject = data['profileInfo'];
      localStorage.setItem('personal', JSON.stringify(this.personalObject));
    });

    this.personalEdited = JSON.parse(localStorage.getItem('personal'));
    this.docorganEdited = this.personalEdited['documentOrgan'];
    this.personal.documentOrgan = this.docorganEdited;
    this.documenttypeEdited = this.personalEdited['documentType'];
    this.personal.documentTypeId = this.documenttypeEdited;
    this.documentnumberEdited = this.personalEdited['documentNumber'];
    this.personal.documentNumber = this.documentnumberEdited;
    //this.el.nativeElement.target = this.personal.documentTypeId.name;
    this.documentdateEdited = <Date>this.datepipe.transform(this.personalEdited['documentDate'], 'yyyy-MM-dd');
    //const documentdate = new Date(this.personalEdited['documentDate']);
    //this.documentdateEdited = <Date>documentdate.toISOString().split('T')[0];
    this.personal.documentDate = this.documentdateEdited;
    this.firstnameEdited = this.personalEdited['firstName'];
    this.personal.firstName = this.firstnameEdited;
    this.lastnameEdited = this.personalEdited['lastName'];
    this.personal.lastName = this.lastnameEdited;
    this.middlenameEdited = this.personalEdited['middleName'];
    this.personal.middleName = this.middlenameEdited;
    const birthdate = new Date(this.personalEdited['birthDate']);
    this.birthdateEdited = <Date>birthdate.toISOString().split('T')[0];
    this.personal.birthDate = this.birthdateEdited;
    this.birthplaceEdited = this.personalEdited['birthPlace'];
    this.personal.birthPlace = this.birthplaceEdited;
    this.identificationnumberEdited = this.personalEdited['identificationNumber'];
    this.personal.identificationNumber = this.identificationnumberEdited;

    this.httpService.getAbitur().subscribe(data => this.httpService.userid = data['id']);
    this.httpService.getDocSeria().subscribe(data => this.docseria = data['content']);
    this.httpService.getDocType().subscribe(data => this.doctype = data['content']);
    this.httpService.getNationality().subscribe(data => this.nationality = data['content']);
  }
}
