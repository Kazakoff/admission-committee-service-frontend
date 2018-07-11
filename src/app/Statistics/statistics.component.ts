import {Component, OnInit} from '@angular/core';

import {NotificationsService} from 'angular2-notifications';
import {HttpService} from './statistics.service';

@Component({
  selector: 'stats',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css'],
  providers: [HttpService],
})
export class StatisticsComponent implements OnInit {
  token = JSON.parse(localStorage.getItem('token'));
  error: number;
  statistics: any;
  summaryCountAbiturients: any;

  constructor(private httpService: HttpService, private _service: NotificationsService) {
  }

  successEvent() {
    this._service.success('Добро пожаловать в приёмную комиссию', 'Нажмите чтобы скрыть...', {
      timeOut: 4000,
      showProgressBar: true,
      pauseOnHover: true,
      clickToClose: true
    });
  }

  errorEvent() {
    this._service.error('Ошибка авторизации!', 'Нажмите чтобы скрыть...', {
      timeOut: 4000,
      showProgressBar: true,
      pauseOnHover: true,
      clickToClose: true
    });
  }

  ngOnInit() {
    this.httpService.getStats().subscribe((data) => {
      this.statistics = data['specialities'];
      this.summaryCountAbiturients = data['summaryCountAbiturients'];
    });
  }
}
