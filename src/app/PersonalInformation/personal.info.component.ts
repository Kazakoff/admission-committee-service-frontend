import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Personal} from './personal';
import {HttpService} from './personal.service';
import {Docseria} from './docseria';
import {Doctype} from './doctype';
import {Nationality} from './nationality';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'personal',
  templateUrl: './personal.info.component.html',
  styles: [`
    input.ng-touched.ng-invalid {
      border: solid red 2px;
    }

    input.ng-touched.ng-valid {
      border: solid green 2px;
    }
  `],
  providers: [HttpService, DatePipe]
})
export class PersonalInfoComponent implements OnInit {

  personal: Personal = new Personal();
  personalObject: Personal[] = [];
  sex = true;

  receivedPersonal: Personal; // полученный пользователь
  done = false;
  doctype: Doctype[] = [];
  docseria: Docseria[] = [];
  nationality: Nationality[] = [];
  personalEdited: Personal;
  selectedDoctype: Doctype;
  selectedDoctype = this.personal.documentTypeId;

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
  compareFn(c1: Doctype, c2: Doctype): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  ngOnInit() {
    this.httpService.getAbitur().subscribe(data => {
      this.personalObject = data['profileInfo'];
      localStorage.setItem('personal', JSON.stringify(this.personalObject));
    });

    this.personalEdited = JSON.parse(localStorage.getItem('personal'));
    this.personal.documentTypeId = this.personalEdited['documentType'];
    this.personal.documentSeriaId = this.personalEdited['documentSeria'];
    this.personal.documentNumber = this.personalEdited['documentNumber'];
    this.personal.documentDate = <Date>this.datepipe.transform(this.personalEdited['documentDate'], 'yyyy-MM-dd');
    this.personal.documentOrgan = this.personalEdited['documentOrgan'];
    this.personal.firstName = this.personalEdited['firstName'];
    this.personal.lastName = this.personalEdited['lastName'];
    this.personal.middleName = this.personalEdited['middleName'];
    this.personal.birthDate = <Date>this.datepipe.transform(this.personalEdited['birthDate'], 'yyyy-MM-dd');
    this.personal.birthPlace = this.personalEdited['birthPlace'];
    this.personal.nationalityId = this.personalEdited['nationality'];
    this.personal.identificationNumber = this.personalEdited['identificationNumber'];
    this.personal.sex = this.personalEdited['sex'];

    this.httpService.getAbitur().subscribe(data => this.httpService.userid = data['id']);
    this.httpService.getDocSeria().subscribe(data => this.docseria = data['content']);
    this.httpService.getDocType().subscribe(data => this.doctype = data['content']);
    this.httpService.getNationality().subscribe(data => this.nationality = data['content']);
  }
}
