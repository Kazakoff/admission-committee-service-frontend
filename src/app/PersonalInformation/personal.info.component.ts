import {Component, OnInit} from '@angular/core';
import {Personal} from './personal';
import {HttpService} from './personal.service';
import {Docseria} from './docseria';
import {Doctype} from './doctype';
import {Nationality} from './nationality';

@Component({
  selector: 'personal',
  templateUrl: './personal.info.component.html',
  providers: [HttpService]
})
export class PersonalInfoComponent implements OnInit {

  personal: Personal = new Personal();
  sex = true;

  receivedPersonal: Personal; // полученный пользователь
  done = false;
  doctype: Doctype[] = [];
  docseria: Docseria[] = [];
  nationality: Nationality[] = [];

  constructor(private httpService: HttpService) {
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
    this.httpService.getAbitur().subscribe(data => this.httpService.userid = data['id']);
    this.httpService.getDocSeria().subscribe(data => this.docseria = data['content']);
    this.httpService.getDocType().subscribe(data => this.doctype = data['content']);
    this.httpService.getNationality().subscribe(data => this.nationality = data['content']);
  }
}
