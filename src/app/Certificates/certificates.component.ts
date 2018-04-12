import {Component, OnInit} from '@angular/core';
import {CompetitionInfo} from './competitionInfo';
import {Eddoctype} from './eddoctype';
import {Subject} from './subject';
import {HttpService} from './certificates.service';
import {Privillege} from './privillege';
import {Certificates} from './certificates';

@Component({
  selector: 'cer',
  templateUrl: './certificates.component.html',
  styleUrls: ['./certificates.component.css'],
  providers: [HttpService]
})
export class CertificatesComponent implements OnInit {

  token = JSON.parse(localStorage.getItem('token'));
  done = false;
  competitionInfo: CompetitionInfo = new CompetitionInfo();
  competitionObject: CompetitionInfo[] = [];
  certificate: Certificates = new Certificates();
  edDocTypes: Eddoctype[] = [];
  subjects: Subject[] = [];
  privilleges: Privillege[] = [{id: 1, name: '', cipher: '', withoutExam: false, withoutCompetition: false}];
  error: any;

  constructor(private httpService: HttpService) {}

  push() {
    this.competitionInfo.documents.push(this.certificate);
    console.log(this.competitionInfo);
  }

  ngOnInit() {
    this.httpService.getEdDocType().subscribe(data => this.edDocTypes = data['content']);
    this.httpService.getSubject().subscribe(data => this.subjects = data['content']);
    this.httpService.getPrivilleges().subscribe(data => this.privilleges = data['content']);
}
}
